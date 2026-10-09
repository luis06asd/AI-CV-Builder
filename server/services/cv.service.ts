import bcrypt from 'bcrypt';
import { randomInt } from 'node:crypto';
import type { Connection, ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { pool } from '../config/database.js';
import type {
  CreateCVInput,
  CreatedCV,
  PublicCV,
  CVSectionsInput,
  UpdateCVInput,
} from '../types/cv.types.js';

const BCRYPT_ROUNDS = 12;
const MAX_ACCESS_CODE_ATTEMPTS = 5;

interface CVRow extends RowDataPacket, PublicCV {
  password_hash: string;
}

const publicCVColumns = `
  id,
  access_code,
  title,
  full_name,
  job_title,
  email,
  phone,
  location,
  website,
  linkedin,
  github,
  summary,
  avatar_url,
  template,
  created_at,
  updated_at
`;

const generateAccessCode = (): number =>
  randomInt(100_000_000, 2_147_483_647);

const toNullableValue = (value: string | null | undefined): string | null =>
  value === undefined || value === '' ? null : value;

const toDateValue = (value: string | null | undefined): string | null => {
  if (
    value === undefined ||
    value === '' ||
    (typeof value === 'string' && value.toLowerCase() === 'actualidad')
  ) {
    return null;
  }

  if (typeof value !== 'string') {
    return null;
  }

  if (/^\d{4}$/.test(value)) {
    return `${value}-01-01`;
  }

  if (/^\d{4}-\d{2}$/.test(value)) {
    return `${value}-01`;
  }

  return value;
};

const isBlankSectionItem = (value: Record<string, unknown>): boolean =>
  Object.entries(value)
    .filter(([field]) => field !== 'id' && field !== 'isCurrent')
    .every(([, fieldValue]) => {
      if (Array.isArray(fieldValue)) {
        return fieldValue.every(
          (item) => typeof item !== 'string' || item.trim().length === 0
        );
      }

      return (
        fieldValue === undefined ||
        fieldValue === null ||
        (typeof fieldValue === 'string' && fieldValue.trim().length === 0)
      );
    });

const saveCVSections = async (
  connection: Connection,
  cvId: number,
  sections: Partial<CVSectionsInput>
): Promise<void> => {
  if (sections.experiences !== undefined) {
    await connection.execute('DELETE FROM experiences WHERE cv_id = ?', [cvId]);
  }
  for (const experience of (sections.experiences ?? []).filter(
    (item) => !isBlankSectionItem(item as unknown as Record<string, unknown>)
  )) {
    await connection.execute(
      `INSERT INTO experiences (
        cv_id, company, role, location, start_date, end_date, is_current,
        description, bullet_points
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        cvId,
        experience.company,
        experience.role,
        toNullableValue(experience.location),
        toDateValue(experience.startDate),
        toDateValue(experience.endDate),
        experience.isCurrent ? 1 : 0,
        toNullableValue(experience.description),
        JSON.stringify(experience.bulletPoints),
      ]
    );
  }

  if (sections.education !== undefined) {
    await connection.execute('DELETE FROM education WHERE cv_id = ?', [cvId]);
  }
  for (const education of (sections.education ?? []).filter(
    (item) => !isBlankSectionItem(item as unknown as Record<string, unknown>)
  )) {
    await connection.execute(
      `INSERT INTO education (
        cv_id, institution, degree, field_of_study, location, start_date,
        end_date, is_current, gpa_or_honors, description
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        cvId,
        education.institution,
        education.degree,
        toNullableValue(education.fieldOfStudy),
        toNullableValue(education.location),
        toDateValue(education.startDate),
        toDateValue(education.endDate),
        education.isCurrent ? 1 : 0,
        toNullableValue(education.gpaOrHonors),
        toNullableValue(education.description),
      ]
    );
  }

  if (sections.skills !== undefined) {
    await connection.execute('DELETE FROM skills WHERE cv_id = ?', [cvId]);
  }
  for (const skill of (sections.skills ?? []).filter(
    (item) => !isBlankSectionItem(item as unknown as Record<string, unknown>)
  )) {
    await connection.execute(
      'INSERT INTO skills (cv_id, name, level) VALUES (?, ?, ?)',
      [cvId, skill.name, toNullableValue(skill.level)]
    );
  }

  if (sections.languages !== undefined) {
    await connection.execute('DELETE FROM languages WHERE cv_id = ?', [cvId]);
  }
  for (const language of (sections.languages ?? []).filter(
    (item) => !isBlankSectionItem(item as unknown as Record<string, unknown>)
  )) {
    await connection.execute(
      'INSERT INTO languages (cv_id, name, proficiency) VALUES (?, ?, ?)',
      [cvId, language.name, language.proficiency]
    );
  }

  if (sections.projects !== undefined) {
    await connection.execute('DELETE FROM projects WHERE cv_id = ?', [cvId]);
  }
  for (const project of (sections.projects ?? []).filter(
    (item) => !isBlankSectionItem(item as unknown as Record<string, unknown>)
  )) {
    await connection.execute(
      `INSERT INTO projects (
        cv_id, name, description, technologies, project_url, start_date, end_date
      ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        cvId,
        project.name,
        toNullableValue(project.description),
        project.technologies.length > 0
          ? project.technologies.join(', ')
          : null,
        toNullableValue(project.link),
        toDateValue(project.startDate),
        toDateValue(project.endDate),
      ]
    );
  }

  if (sections.certifications !== undefined) {
    await connection.execute('DELETE FROM certifications WHERE cv_id = ?', [cvId]);
  }
  for (const certification of (sections.certifications ?? []).filter(
    (item) => !isBlankSectionItem(item as unknown as Record<string, unknown>)
  )) {
    await connection.execute(
      `INSERT INTO certifications (
        cv_id, name, issuing_organization, issue_date, expiration_date,
        credential_id, credential_url
      ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        cvId,
        certification.name,
        toNullableValue(certification.issuer),
        toDateValue(certification.issueDate),
        toDateValue(certification.expiryDate),
        toNullableValue(certification.credentialId),
        toNullableValue(certification.credentialUrl),
      ]
    );
  }
};

export const createCV = async (input: CreateCVInput): Promise<CreatedCV> => {
  const passwordHash = await bcrypt.hash(input.password, BCRYPT_ROUNDS);

  for (let attempt = 0; attempt < MAX_ACCESS_CODE_ATTEMPTS; attempt += 1) {
    const connection = await pool.getConnection();
    const accessCode = generateAccessCode();

    try {
      const [existingCodes] = await connection.execute<RowDataPacket[]>(
        'SELECT id FROM cvs WHERE access_code = ? LIMIT 1',
        [accessCode]
      );

      if (existingCodes.length > 0) {
        connection.release();
        continue;
      }

      await connection.beginTransaction();
      const [result] = await connection.execute<ResultSetHeader>(
        `INSERT INTO cvs (
          access_code,
          password_hash,
          title,
          full_name,
          job_title,
          email,
          phone,
          location,
          website,
          linkedin,
          github,
          summary,
          avatar_url,
          template,
          created_at,
          updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`,
        [
          accessCode,
          passwordHash,
          input.title ?? null,
          input.full_name ?? null,
          input.job_title ?? null,
          input.email ?? null,
          input.phone ?? null,
          input.location ?? null,
          input.website ?? null,
          input.linkedin ?? null,
          input.github ?? null,
          input.summary ?? null,
          input.avatar_url ?? null,
          input.template ?? null,
        ]
      );

      await saveCVSections(connection, result.insertId, input);
      await connection.commit();
      connection.release();
      return { id: result.insertId, access_code: accessCode };
    } catch (error) {
      await connection.rollback();
      connection.release();
      throw error;
    }
  }

  throw new Error('Unable to generate a unique access code.');
};

export const getCVById = async (id: number): Promise<PublicCV | null> => {
  const [rows] = await pool.execute<CVRow[]>(
    `SELECT ${publicCVColumns} FROM cvs WHERE id = ? LIMIT 1`,
    [id]
  );

  return rows[0] ?? null;
};

const updateCVWithoutPassword = async (
  connection: Connection,
  id: number,
  input: UpdateCVInput
): Promise<void> => {
  await connection.execute(
    `UPDATE cvs
     SET title = ?,
         full_name = ?,
         job_title = ?,
         email = ?,
         phone = ?,
         location = ?,
         website = ?,
         linkedin = ?,
         github = ?,
         summary = ?,
         avatar_url = ?,
         template = ?,
         updated_at = CURRENT_TIMESTAMP
     WHERE id = ?`,
    [
      toNullableValue(input.title),
      toNullableValue(input.full_name),
      toNullableValue(input.job_title),
      toNullableValue(input.email),
      toNullableValue(input.phone),
      toNullableValue(input.location),
      toNullableValue(input.website),
      toNullableValue(input.linkedin),
      toNullableValue(input.github),
      toNullableValue(input.summary),
      toNullableValue(input.avatar_url),
      toNullableValue(input.template),
      id,
    ]
  );
};

const updateCVWithPassword = async (
  connection: Connection,
  id: number,
  input: UpdateCVInput,
  passwordHash: string
): Promise<void> => {
  await connection.execute(
    `UPDATE cvs
     SET password_hash = ?,
         title = ?,
         full_name = ?,
         job_title = ?,
         email = ?,
         phone = ?,
         location = ?,
         website = ?,
         linkedin = ?,
         github = ?,
         summary = ?,
         avatar_url = ?,
         template = ?,
         updated_at = CURRENT_TIMESTAMP
     WHERE id = ?`,
    [
      passwordHash,
      toNullableValue(input.title),
      toNullableValue(input.full_name),
      toNullableValue(input.job_title),
      toNullableValue(input.email),
      toNullableValue(input.phone),
      toNullableValue(input.location),
      toNullableValue(input.website),
      toNullableValue(input.linkedin),
      toNullableValue(input.github),
      toNullableValue(input.summary),
      toNullableValue(input.avatar_url),
      toNullableValue(input.template),
      id,
    ]
  );
};

export const updateCV = async (
  id: number,
  input: UpdateCVInput
): Promise<PublicCV | null> => {
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    if (input.password !== undefined) {
      const passwordHash = await bcrypt.hash(input.password, BCRYPT_ROUNDS);
      await updateCVWithPassword(connection, id, input, passwordHash);
    } else {
      await updateCVWithoutPassword(connection, id, input);
    }

    const sections: Partial<CVSectionsInput> = {
      experiences: input.experiences,
      education: input.education,
      skills: input.skills,
      languages: input.languages,
      projects: input.projects,
      certifications: input.certifications,
    };

    const hasSections = [
      input.experiences,
      input.education,
      input.skills,
      input.languages,
      input.projects,
      input.certifications,
    ].some((section) => section !== undefined);

    if (hasSections) {
      await saveCVSections(connection, id, sections);
    }

    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }

  return getCVById(id);
};

export const deleteCV = async (id: number): Promise<boolean> => {
  const [result] = await pool.execute<ResultSetHeader>(
    'DELETE FROM cvs WHERE id = ?',
    [id]
  );

  return result.affectedRows > 0;
};
