const STORAGE_KEY = "quiz-appearance";

/** Runs before paint so a saved dark theme does not flash light on reload. */
export const appearanceScript = `(function(){try{var t=localStorage.getItem('${STORAGE_KEY}')==='dark'?'dark':'light';document.documentElement.dataset.theme=t;document.documentElement.style.colorScheme=t;var m=document.querySelector('meta[name="theme-color"]');if(m)m.content=t==='dark'?'#141b1a':'#f6f7f4'}catch(e){}})()`;

