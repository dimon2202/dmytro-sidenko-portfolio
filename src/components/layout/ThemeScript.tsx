// Runs before first paint so the stored theme is applied without a flash. Light is the default.
const script = `(function(){var t='light';try{var s=localStorage.getItem('theme');if(s==='dark'||s==='light')t=s;}catch(e){}document.documentElement.setAttribute('data-theme',t);})();`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
