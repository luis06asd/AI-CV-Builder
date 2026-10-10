import React from 'react';
import { Check, Copy, KeyRound, Loader2, X } from 'lucide-react';
import { createCV, updateCV } from '../../../api/cvApi';
import type { CVData } from '../../../types/cv.types';
import type { TemplateId } from '../../../types/template.types';

interface SaveCVModalProps {
  cv: CVData;
  templateId: TemplateId;
  onClose: () => void;
}

export const SaveCVModal: React.FC<SaveCVModalProps> = ({
  cv,
  templateId,
  onClose,
}) => {
  const [password, setPassword] = React.useState('');
  const [passwordConfirmation, setPasswordConfirmation] = React.useState('');
  const [accessCode, setAccessCode] = React.useState<number | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [isSaving, setIsSaving] = React.useState(false);
  const [isCopied, setIsCopied] = React.useState(false);
  const isExistingCV = Number.isSafeInteger(Number(cv.id)) && Number(cv.id) > 0;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!isExistingCV && password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres.');
      return;
    }

    if (!isExistingCV && password !== passwordConfirmation) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    if (!cv.title.trim() || !cv.personalInfo.fullName.trim()) {
      setError('Completa el título del CV y el nombre completo antes de guardarlo.');
      return;
    }

    setIsSaving(true);

    try {
      if (isExistingCV) {
        await updateCV(cv, templateId);
        setAccessCode(0);
      } else {
        const result = await createCV(cv, templateId, password);
        setAccessCode(result.access_code);
        setPassword('');
        setPasswordConfirmation('');
      }
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : 'No fue posible guardar el CV.'
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleCopy = async () => {
    if (accessCode === null || accessCode === 0) return;

    await navigator.clipboard.writeText(String(accessCode));
    setIsCopied(true);
    window.setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="save-cv-title"
    >
      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
              <KeyRound size={17} />
            </div>
            <div>
              <h2 id="save-cv-title" className="text-sm font-bold text-slate-900">
                {isExistingCV ? 'Guardar cambios' : 'Guardar CV'}
              </h2>
              <p className="text-[11px] text-slate-500">
                {isExistingCV ? 'Guarda los cambios en tu CV recuperado.' : 'Crea una contraseña para recuperar este CV.'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            title="Cerrar"
          >
            <X size={18} />
          </button>
        </div>

        {accessCode !== null ? (
          <div className="space-y-4 px-5 py-6">
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-center">
              <Check size={24} className="mx-auto mb-2 text-emerald-600" />
              <p className="text-sm font-bold text-emerald-900">{isExistingCV ? 'Cambios guardados correctamente' : 'CV guardado correctamente'}</p>
              {!isExistingCV && <><p className="mt-1 text-xs text-emerald-700">Guarda este código para recuperar tu CV posteriormente.</p><div className="mt-4 flex items-center justify-center gap-2"><code className="rounded-lg bg-white px-4 py-2 text-lg font-bold tracking-widest text-slate-900 shadow-sm">{accessCode}</code><button type="button" onClick={handleCopy} className="rounded-lg border border-emerald-300 bg-white p-2 text-emerald-700 transition hover:bg-emerald-100" title="Copiar código de acceso">{isCopied ? <Check size={16} /> : <Copy size={16} />}</button></div>{isCopied && <p className="mt-2 text-[11px] font-medium text-emerald-700">Código copiado</p>}</>}
            </div>
            <button
              type="button"
              onClick={onClose}
              className="w-full rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-blue-700"
            >
              Continuar editando
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 px-5 py-5">
            {!isExistingCV && <div>
              <label
                htmlFor="cv-password"
                className="mb-1 block text-xs font-semibold text-slate-700"
              >
                Contraseña
              </label>
              <input
                id="cv-password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="new-password"
                minLength={8}
                required
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                placeholder="Mínimo 8 caracteres"
              />
            </div>}
            {!isExistingCV && <div>
              <label
                htmlFor="cv-password-confirmation"
                className="mb-1 block text-xs font-semibold text-slate-700"
              >
                Confirmación de contraseña
              </label>
              <input
                id="cv-password-confirmation"
                type="password"
                value={passwordConfirmation}
                onChange={(event) => setPasswordConfirmation(event.target.value)}
                autoComplete="new-password"
                minLength={8}
                required
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                placeholder="Repite la contraseña"
              />
            </div>}

            {error && (
              <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={isSaving}
              className="w-full rounded-lg bg-emerald-600 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSaving && <Loader2 size={15} className="mr-1 inline animate-spin" />}
              {isSaving ? (isExistingCV ? 'Guardando cambios...' : 'Guardando CV...') : (isExistingCV ? 'Guardar cambios' : 'Guardar CV')}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
