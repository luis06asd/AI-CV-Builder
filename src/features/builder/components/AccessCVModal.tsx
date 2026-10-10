import React from 'react';
import { Eye, EyeOff, KeyRound, Loader2, X } from 'lucide-react';
import { accessCV } from '../../../api/cvApi';
import { useCVStore } from '../../../store/cvStore';
import { useUIStore } from '../../../store/uiStore';

interface AccessCVModalProps {
  onClose: () => void;
  onLoaded?: () => void;
}

export const AccessCVModal: React.FC<AccessCVModalProps> = ({ onClose, onLoaded }) => {
  const loadCV = useCVStore((state) => state.loadCV);
  const setSelectedTemplate = useUIStore((state) => state.setSelectedTemplate);
  const [accessCode, setAccessCode] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    if (!accessCode.trim() || !password) {
      setError('Ingresa el código de acceso y la contraseña.');
      return;
    }

    setIsLoading(true);
    try {
      const result = await accessCV(accessCode.trim(), password);
      loadCV(result.cv);
      if (result.template) {
        setSelectedTemplate(result.template as Parameters<typeof setSelectedTemplate>[0]);
      }
      onLoaded?.();
      onClose();
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : 'No fue posible verificar el acceso. Inténtalo de nuevo.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4" role="dialog" aria-modal="true" aria-labelledby="access-cv-title">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
              <KeyRound size={17} />
            </div>
            <div>
              <h2 id="access-cv-title" className="text-sm font-bold text-slate-900">Cargar CV guardado</h2>
              <p className="text-[11px] text-slate-500">Usa el código y la contraseña de tu CV.</p>
            </div>
          </div>
          <button type="button" onClick={onClose} className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700" title="Cancelar">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 px-5 py-5">
          <div>
            <label htmlFor="cv-access-code" className="mb-1 block text-xs font-semibold text-slate-700">Código de acceso</label>
            <input id="cv-access-code" value={accessCode} onChange={(event) => setAccessCode(event.target.value)} inputMode="numeric" required className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20" placeholder="Ej. 123456789" />
          </div>
          <div>
            <label htmlFor="cv-access-password" className="mb-1 block text-xs font-semibold text-slate-700">Contraseña</label>
            <div className="relative">
              <input id="cv-access-password" type={showPassword ? 'text' : 'password'} value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" required className="w-full rounded-lg border border-slate-300 px-3 py-2 pr-10 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20" placeholder="Contraseña del CV" />
              <button type="button" onClick={() => setShowPassword((visible) => !visible)} className="absolute inset-y-0 right-0 px-3 text-slate-400 hover:text-slate-700" title={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}>
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          {error && <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">{error}</p>}
          <div className="flex gap-2">
            <button type="button" onClick={onClose} className="flex-1 rounded-lg border border-slate-300 px-4 py-2.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50">Cancelar</button>
            <button type="submit" disabled={isLoading} className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60">
              {isLoading && <Loader2 size={15} className="animate-spin" />}
              {isLoading ? 'Verificando...' : 'Ingresar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
