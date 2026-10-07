import React from 'react';
import { useCVStore } from '../../../store/cvStore';
import { User, Mail, Phone, MapPin, Globe, FileText, Camera, Upload, Trash2, AlertCircle } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '../../../components/common/BrandIcons';

export const PersonalInfoSection: React.FC = () => {
  const personalInfo = useCVStore((state) => state.cv.personalInfo);
  const updatePersonalInfo = useCVStore((state) => state.updatePersonalInfo);

  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const [photoError, setPhotoError] = React.useState<string | null>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPhotoError(null);

    // Validación de formato: JPG, JPEG, PNG
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!validTypes.includes(file.type.toLowerCase())) {
      setPhotoError('Formato no válido. Por favor selecciona una imagen JPG, JPEG o PNG.');
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    // Validación de tamaño: máximo 2.5 MB
    const maxSize = 2.5 * 1024 * 1024;
    if (file.size > maxSize) {
      setPhotoError('La imagen supera el límite de 2.5 MB. Elige una imagen más liviana.');
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result;
      if (typeof result === 'string') {
        updatePersonalInfo({ avatarUrl: result });
      }
    };
    reader.onerror = () => {
      setPhotoError('Error al leer el archivo. Inténtalo de nuevo.');
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = () => {
    updatePersonalInfo({ avatarUrl: undefined });
    setPhotoError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-base font-bold text-slate-800">Información Personal</h3>
        <p className="text-xs text-slate-500">
          Los datos esenciales para que los reclutadores te contacten e identifiquen rápidamente.
        </p>
      </div>

      {/* SECCIÓN: FOTO DE PERFIL */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
            <Camera size={15} className="text-blue-600" />
            Foto de Perfil (Opcional)
          </label>
          <span className="text-[11px] text-slate-400">JPG, JPEG o PNG (máx. 2.5MB)</span>
        </div>

        <div className="flex items-center gap-4">
          {/* Vista previa de foto */}
          <div className="relative group">
            {personalInfo.avatarUrl ? (
              <img
                src={personalInfo.avatarUrl}
                alt="Foto de perfil"
                className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md ring-2 ring-blue-500/20"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-slate-200 border-2 border-white shadow-inner flex items-center justify-center text-slate-400">
                <User size={28} />
              </div>
            )}
          </div>

          {/* Botones de acción */}
          <div className="flex-1 space-y-1.5">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png"
              onChange={handlePhotoUpload}
              className="hidden"
            />

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 rounded-lg text-xs font-medium shadow-sm transition"
              >
                <Upload size={13} className="text-blue-600" />
                <span>{personalInfo.avatarUrl ? 'Cambiar foto' : 'Subir foto'}</span>
              </button>

              {personalInfo.avatarUrl && (
                <button
                  type="button"
                  onClick={handleRemovePhoto}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-lg text-xs font-medium transition"
                  title="Eliminar foto de perfil"
                >
                  <Trash2 size={13} />
                  <span>Eliminar</span>
                </button>
              )}
            </div>

            <p className="text-[11px] text-slate-500">
              Cada plantilla adapta la foto con su propio estilo y ubicación sin alterar los datos.
            </p>
          </div>
        </div>

        {/* Mensaje de error de validación */}
        {photoError && (
          <div className="flex items-center gap-2 p-2.5 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700">
            <AlertCircle size={14} className="shrink-0 text-red-500" />
            <span className="flex-1">{photoError}</span>
            <button
              type="button"
              onClick={() => setPhotoError(null)}
              className="text-red-400 hover:text-red-600 text-xs font-bold"
            >
              ✕
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Nombre Completo *
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-2.5 flex items-center text-slate-400">
              <User size={15} />
            </span>
            <input
              type="text"
              value={personalInfo.fullName}
              onChange={(e) => updatePersonalInfo({ fullName: e.target.value })}
              placeholder="Ej. Ana García López"
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Puesto / Título Profesional *
          </label>
          <input
            type="text"
            value={personalInfo.jobTitle}
            onChange={(e) => updatePersonalInfo({ jobTitle: e.target.value })}
            placeholder="Ej. Senior Frontend Engineer"
            className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Correo Electrónico *
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-2.5 flex items-center text-slate-400">
              <Mail size={15} />
            </span>
            <input
              type="email"
              value={personalInfo.email}
              onChange={(e) => updatePersonalInfo({ email: e.target.value })}
              placeholder="ana.garcia@email.com"
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Teléfono *
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-2.5 flex items-center text-slate-400">
              <Phone size={15} />
            </span>
            <input
              type="tel"
              value={personalInfo.phone}
              onChange={(e) => updatePersonalInfo({ phone: e.target.value })}
              placeholder="+34 600 000 000"
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Ubicación (Ciudad, País)
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-2.5 flex items-center text-slate-400">
              <MapPin size={15} />
            </span>
            <input
              type="text"
              value={personalInfo.location}
              onChange={(e) => updatePersonalInfo({ location: e.target.value })}
              placeholder="Madrid, España"
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            LinkedIn
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-2.5 flex items-center text-slate-400">
              <LinkedinIcon size={15} />
            </span>
            <input
              type="url"
              value={personalInfo.linkedin || ''}
              onChange={(e) => updatePersonalInfo({ linkedin: e.target.value })}
              placeholder="https://linkedin.com/in/usuario"
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            GitHub
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-2.5 flex items-center text-slate-400">
              <GithubIcon size={15} />
            </span>
            <input
              type="url"
              value={personalInfo.github || ''}
              onChange={(e) => updatePersonalInfo({ github: e.target.value })}
              placeholder="https://github.com/usuario"
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Sitio Web / Portafolio
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-2.5 flex items-center text-slate-400">
              <Globe size={15} />
            </span>
            <input
              type="url"
              value={personalInfo.website || ''}
              onChange={(e) => updatePersonalInfo({ website: e.target.value })}
              placeholder="https://miportafolio.dev"
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>
        </div>
      </div>

      <div className="pt-2 border-t border-slate-200">
        <div className="flex items-center justify-between mb-1">
          <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
            <FileText size={15} className="text-blue-600" />
            Perfil Profesional / Resumen
          </label>
        </div>
        <textarea
          rows={4}
          value={personalInfo.summary}
          onChange={(e) => updatePersonalInfo({ summary: e.target.value })}
          placeholder="Describe brevemente tus fortalezas, experiencia clave y lo que puedes aportar a la empresa..."
          className="w-full p-2.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition leading-relaxed"
        />
      </div>
    </div>
  );
};
