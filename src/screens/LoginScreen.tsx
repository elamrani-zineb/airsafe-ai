// ─────────────────────────────────────────────
//  AirSafe AI — Login Screen
// ─────────────────────────────────────────────
import React, { useState } from 'react';

// ── Inline styles ─────────────────────────────
const S = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(160deg, #EAF3FB 0%, #F0F7FF 40%, #F8FAFF 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px 20px',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    WebkitFontSmoothing: 'antialiased',
  } as React.CSSProperties,

  phone: {
    width: '100%',
    maxWidth: 390,
    minHeight: 780,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  } as React.CSSProperties,

  statusBar: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 8px 18px',
    fontSize: 11,
    fontWeight: 600,
    color: '#374151',
  } as React.CSSProperties,

  topSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 10,
    padding: '8px 0 28px',
    width: '100%',
  } as React.CSSProperties,

  logoWrap: {
    width: 64, height: 64,
    borderRadius: 18,
    background: 'linear-gradient(135deg, #378ADD 0%, #1A5FA8 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 8px 24px rgba(55,138,221,.28)',
  } as React.CSSProperties,

  appName: {
    fontSize: 26,
    fontWeight: 700,
    color: '#111827',
    letterSpacing: '-0.5px',
  } as React.CSSProperties,

  tagline: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: 400,
    textAlign: 'center',
    lineHeight: 1.5,
  } as React.CSSProperties,

  card: {
    width: '100%',
    background: '#fff',
    borderRadius: 24,
    padding: '28px 24px 24px',
    boxShadow: '0 2px 4px rgba(0,0,0,.04), 0 8px 24px rgba(55,138,221,.08), 0 1px 2px rgba(0,0,0,.06)',
    marginTop: 4,
  } as React.CSSProperties,

  fieldLabel: {
    fontSize: 11,
    fontWeight: 500,
    color: '#6B7280',
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    marginBottom: 6,
    display: 'block',
  } as React.CSSProperties,

  inputWrap: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  } as React.CSSProperties,

  input: {
    width: '100%',
    height: 48,
    padding: '0 42px 0 40px',
    border: '1.5px solid #E5E7EB',
    borderRadius: 12,
    fontSize: 14,
    fontFamily: 'inherit',
    color: '#111827',
    background: '#FAFBFD',
    outline: 'none',
  } as React.CSSProperties,

  inputFocused: {
    borderColor: '#378ADD',
    background: '#fff',
    boxShadow: '0 0 0 3px rgba(55,138,221,.12)',
  } as React.CSSProperties,

  iconLeft: {
    position: 'absolute',
    left: 12,
    top: '50%',
    transform: 'translateY(-50%)',
    pointerEvents: 'none',
    color: '#9CA3AF',
    display: 'flex',
    alignItems: 'center',
  } as React.CSSProperties,

  iconRight: {
    position: 'absolute',
    right: 12,
    top: '50%',
    transform: 'translateY(-50%)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
  } as React.CSSProperties,

  divider: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    margin: '20px 0',
  } as React.CSSProperties,

  dividerLine: {
    flex: 1,
    height: 1,
    background: '#E5E7EB',
  } as React.CSSProperties,

  bottomText: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 13,
    color: '#6B7280',
    paddingBottom: 8,
  } as React.CSSProperties,

  legalText: {
    marginTop: 12,
    textAlign: 'center',
    fontSize: 10,
    color: '#C0C7D4',
  } as React.CSSProperties,
};

// ── SVG Icons ─────────────────────────────────
const LogoIcon: React.FC = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <path d="M18 28C18 28 8 22 8 13C8 8.03 12.48 4 18 4C23.52 4 28 8.03 28 13C28 22 18 28 18 28Z"
      fill="white" opacity=".15"/>
    <path d="M18 26C18 26 10 21 10 13.5C10 9.36 13.58 6 18 6C22.42 6 26 9.36 26 13.5C26 21 18 26 18 26Z"
      fill="white" opacity=".25"/>
    <path d="M18 9v17" stroke="white" strokeWidth="1.2" strokeLinecap="round" opacity=".5"/>
    <path d="M22 15c1.5-.5 2.5-1.5 2.5-3" stroke="white" strokeWidth="1.3" strokeLinecap="round" opacity=".8"/>
    <path d="M22 18c2.5-.5 4-2.5 4-5" stroke="white" strokeWidth="1.3" strokeLinecap="round" opacity=".55"/>
    <path d="M14 15c-1.5-.5-2.5-1.5-2.5-3" stroke="white" strokeWidth="1.3" strokeLinecap="round" opacity=".8"/>
    <path d="M14 18c-2.5-.5-4-2.5-4-5" stroke="white" strokeWidth="1.3" strokeLinecap="round" opacity=".55"/>
  </svg>
);

const MailIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
    stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="3" width="14" height="10" rx="2"/>
    <path d="M1 5l7 5 7-5"/>
  </svg>
);

const LockIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
    stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="7" width="10" height="8" rx="1.5"/>
    <path d="M5 7V5a3 3 0 016 0v2"/>
    <circle cx="8" cy="11" r="1" fill="currentColor" stroke="none"/>
  </svg>
);

const EyeIcon: React.FC<{ visible: boolean }> = ({ visible }) =>
  visible ? (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
      stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 8C1 8 3.5 3 8 3s7 5 7 5-2.5 5-7 5S1 8 1 8z"/>
      <line x1="1" y1="1" x2="15" y2="15"/>
    </svg>
  ) : (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
      stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 8C1 8 3.5 3 8 3s7 5 7 5-2.5 5-7 5S1 8 1 8z"/>
      <circle cx="8" cy="8" r="2"/>
    </svg>
  );

const LoginArrowIcon: React.FC = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none"
    stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5.5 7.5h7M9.5 5l3 2.5-3 2.5"/>
    <path d="M8 2.5H3a1 1 0 00-1 1v8a1 1 0 001 1h5"/>
  </svg>
);

const CheckIcon: React.FC = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none"
    stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.5 8l3.5 3.5 6-7"/>
  </svg>
);

const SpinnerIcon: React.FC = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
    <circle cx="7.5" cy="7.5" r="5.5" stroke="rgba(255,255,255,.4)" strokeWidth="1.5"/>
    <path d="M7.5 2a5.5 5.5 0 015.5 5.5" stroke="white" strokeWidth="1.5" strokeLinecap="round">
      <animateTransform attributeName="transform" type="rotate"
        from="0 7.5 7.5" to="360 7.5 7.5" dur=".7s" repeatCount="indefinite"/>
    </path>
  </svg>
);

// ── Status Bar Icons ──────────────────────────
const StatusIcons: React.FC = () => (
  <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
    <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
      <rect x="0" y="4" width="2" height="6" rx=".5" fill="#374151"/>
      <rect x="2.5" y="2.5" width="2" height="7.5" rx=".5" fill="#374151"/>
      <rect x="5" y="1" width="2" height="9" rx=".5" fill="#374151"/>
      <rect x="7.5" y="0" width="2" height="10" rx=".5" fill="#374151" opacity=".3"/>
    </svg>
    <svg width="13" height="10" viewBox="0 0 13 10" fill="none">
      <path d="M6.5 2.5C8.5 2.5 10.2 3.4 11.3 4.8L12.5 3.4C11 1.7 8.9.6 6.5.6S2 1.7.5 3.4L1.7 4.8C2.8 3.4 4.5 2.5 6.5 2.5Z" fill="#374151"/>
      <path d="M6.5 5.2C7.8 5.2 8.9 5.8 9.7 6.7L10.9 5.3C9.7 4.1 8.2 3.3 6.5 3.3S3.3 4.1 2.1 5.3L3.3 6.7C4.1 5.8 5.2 5.2 6.5 5.2Z" fill="#374151"/>
      <circle cx="6.5" cy="8.5" r="1.3" fill="#374151"/>
    </svg>
    <svg width="22" height="11" viewBox="0 0 22 11" fill="none">
      <rect x=".5" y=".5" width="18" height="10" rx="2.5" stroke="#374151" strokeOpacity=".35"/>
      <rect x="1.5" y="1.5" width="14" height="8" rx="2" fill="#374151"/>
      <path d="M19.5 4v3a1.5 1.5 0 000-3z" fill="#374151" opacity=".4"/>
    </svg>
  </div>
);

// ── Input Field Component ─────────────────────
interface InputFieldProps {
  id: string;
  label: string;
  type: 'email' | 'password' | 'text';
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  leftIcon: React.ReactNode;
  rightIcon?: React.ReactNode;
  autoComplete?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  id, label, type, placeholder, value, onChange,
  leftIcon, rightIcon, autoComplete,
}) => {
  const [focused, setFocused] = useState(false);

  return (
    <div style={{ marginBottom: 14 }}>
      <label htmlFor={id} style={S.fieldLabel}>{label}</label>
      <div style={S.inputWrap}>
        <span style={{ ...S.iconLeft, color: focused ? '#378ADD' : '#9CA3AF' }}>
          {leftIcon}
        </span>
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          autoComplete={autoComplete}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            ...S.input,
            ...(focused ? S.inputFocused : {}),
            paddingRight: rightIcon ? 42 : 14,
          }}
        />
        {rightIcon && (
          <span style={S.iconRight}>{rightIcon}</span>
        )}
      </div>
    </div>
  );
};

// ── Login Button States ───────────────────────
type LoginState = 'idle' | 'loading' | 'success';

interface LoginButtonProps {
  state: LoginState;
  onClick: () => void;
}

const LOGIN_BUTTON_STYLES: Record<LoginState, React.CSSProperties> = {
  idle: {
    background: 'linear-gradient(135deg, #378ADD 0%, #2063B8 100%)',
    boxShadow: '0 4px 16px rgba(55,138,221,.35)',
  },
  loading: {
    background: 'linear-gradient(135deg, #378ADD 0%, #2063B8 100%)',
    boxShadow: '0 4px 16px rgba(55,138,221,.25)',
    opacity: 0.85,
  },
  success: {
    background: 'linear-gradient(135deg, #639922 0%, #4a7318 100%)',
    boxShadow: '0 4px 16px rgba(99,153,34,.35)',
  },
};

const LoginButton: React.FC<LoginButtonProps> = ({ state, onClick }) => (
  <button
    onClick={onClick}
    disabled={state !== 'idle'}
    style={{
      width: '100%',
      height: 50,
      color: '#fff',
      border: 'none',
      borderRadius: 13,
      fontSize: 15,
      fontWeight: 600,
      fontFamily: 'inherit',
      cursor: state === 'idle' ? 'pointer' : 'default',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      letterSpacing: '0.01em',
      transition: 'opacity .15s, transform .1s, box-shadow .15s',
      ...LOGIN_BUTTON_STYLES[state],
    }}
  >
    {state === 'idle'    && <><LoginArrowIcon /> Connexion</>}
    {state === 'loading' && <><SpinnerIcon /> Connexion en cours…</>}
    {state === 'success' && <><CheckIcon /> Connecté !</>}
  </button>
);

// ── Login Screen ──────────────────────────────
export interface LoginScreenProps {
  /** Called with (email, password) when the form is submitted */
  onLogin?: (email: string, password: string) => Promise<void>;
  /** Called when the user clicks "S'inscrire" */
  onRegister?: () => void;
  /** Called when the user clicks "Mot de passe oublié ?" */
  onForgotPassword?: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onLogin,
  onRegister,
  onForgotPassword,
}) => {
  const [email,       setEmail]       = useState('');
  const [password,    setPassword]    = useState('');
  const [showPwd,     setShowPwd]     = useState(false);
  const [loginState,  setLoginState]  = useState<LoginState>('idle');
  const [error,       setError]       = useState('');

  const handleSubmit = async () => {
    if (!email || !password) {
      setError('Veuillez remplir tous les champs.');
      return;
    }
    setError('');
    setLoginState('loading');

    try {
      await (onLogin?.(email, password) ?? simulateLogin());
      setLoginState('success');
    } catch (err) {
      setLoginState('idle');
      setError(err instanceof Error ? err.message : 'Identifiants incorrects.');
    }
  };

  return (
    <div style={S.page}>
      <div style={S.phone}>

        {/* Status Bar */}
        <div style={S.statusBar}>
          <span>9:41</span>
          <StatusIcons />
        </div>

        {/* Top Section */}
        <div style={S.topSection}>
          <div style={S.logoWrap}>
            <LogoIcon />
          </div>
          <div style={S.appName}>
            AirSafe <span style={{ color: '#378ADD' }}>AI</span>
          </div>
          <div style={S.tagline}>
            Surveillez l'air.<br />Protégez votre santé.
          </div>
        </div>

        {/* Form Card */}
        <div style={S.card}>
          <div style={{ fontSize: 18, fontWeight: 700, color: '#111827', marginBottom: 6 }}>
            Connexion
          </div>
          <div style={{ fontSize: 12, color: '#6B7280', marginBottom: 24 }}>
            Accédez à votre tableau de bord santé
          </div>

          <InputField
            id="email"
            label="Adresse e-mail"
            type="email"
            placeholder="vous@exemple.fr"
            value={email}
            onChange={setEmail}
            autoComplete="email"
            leftIcon={<MailIcon />}
          />

          <InputField
            id="password"
            label="Mot de passe"
            type={showPwd ? 'text' : 'password'}
            placeholder="••••••••"
            value={password}
            onChange={setPassword}
            autoComplete="current-password"
            leftIcon={<LockIcon />}
            rightIcon={
              <span
                onClick={() => setShowPwd(v => !v)}
                style={{ color: showPwd ? '#378ADD' : '#9CA3AF' }}
              >
                <EyeIcon visible={showPwd} />
              </span>
            }
          />

          {/* Error message */}
          {error && (
            <div style={{
              fontSize: 11, color: '#E24B4A',
              background: '#FEF2F2',
              border: '0.5px solid #FCA5A5',
              borderRadius: 8, padding: '7px 10px',
              marginBottom: 12,
            }}>
              {error}
            </div>
          )}

          {/* Forgot password */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 20 }}>
            <button
              onClick={onForgotPassword}
              style={{
                background: 'none', border: 'none', padding: 0,
                fontSize: 11, color: '#378ADD', fontWeight: 500,
                cursor: 'pointer', fontFamily: 'inherit',
              }}
            >
              Mot de passe oublié ?
            </button>
          </div>

          <LoginButton state={loginState} onClick={handleSubmit} />

          {/* Divider */}
          <div style={S.divider}>
            <div style={S.dividerLine} />
            <span style={{ fontSize: 12, color: '#C0C7D4', fontWeight: 500, flexShrink: 0 }}>ou</span>
            <div style={S.dividerLine} />
          </div>

          {/* Sign-up link */}
          <div style={{ textAlign: 'center', fontSize: 13, color: '#6B7280' }}>
            Pas encore de compte ?
            <button
              onClick={onRegister}
              style={{
                background: 'none', border: 'none', padding: 0,
                fontSize: 13, color: '#378ADD', fontWeight: 600,
                cursor: 'pointer', fontFamily: 'inherit', marginLeft: 4,
              }}
            >
              S'inscrire
            </button>
          </div>
        </div>

        {/* Legal */}
        <div style={S.legalText}>
          En vous connectant, vous acceptez nos{' '}
          <button style={{
            background: 'none', border: 'none', padding: 0,
            fontSize: 10, color: '#9CA3AF', cursor: 'pointer', fontFamily: 'inherit',
          }}>
            Conditions d'utilisation
          </button>
        </div>

      </div>
    </div>
  );
};

// ── Simulated async login (dev only) ──────────
function simulateLogin(): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, 1800));
}

export default LoginScreen;
