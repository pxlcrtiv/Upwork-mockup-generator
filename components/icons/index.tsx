
import React from 'react';

export const UploadIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
  </svg>
);

export const DownloadIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
  </svg>
);

export const SparklesIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" d="M9 4.5a.75.75 0 01.75.75V9a.75.75 0 01-1.5 0V5.25A.75.75 0 019 4.5zm6.303.75a.75.75 0 00-1.06-1.06l-2.5 2.5a.75.75 0 001.06 1.06l2.5-2.5zM9 15a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V15.75A.75.75 0 019 15zm-3.197-2.803a.75.75 0 00-1.06-1.06l-2.5 2.5a.75.75 0 101.06 1.06l2.5-2.5zM19.5 9a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9.75A.75.75 0 0119.5 9zm-3.197 2.803a.75.75 0 00-1.06 1.06l2.5 2.5a.75.75 0 101.06-1.06l-2.5-2.5zM15 9a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H15.75A.75.75 0 0115 9zm-3.197-6.197a.75.75 0 00-1.06 1.06l2.5 2.5a.75.75 0 101.06-1.06l-2.5-2.5zM4.5 9a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H5.25A.75.75 0 014.5 9z" clipRule="evenodd" />
    </svg>
);

export const DesignIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
        <path d="M10 3.5a1.5 1.5 0 01.822 2.83l-4.14 4.14a1.5 1.5 0 11-2.122-2.122L8.7 4.172A1.5 1.5 0 0110 3.5zM10 3.5a1.5 1.5 0 00-1.06-.44 1.5 1.5 0 00-1.06.44l-4.14 4.14a1.5 1.5 0 102.12 2.122L10.16 5.68a1.5 1.5 0 00-2.12-2.122L3.84 7.7A1.5 1.5 0 005.96 9.82l4.14-4.14A1.5 1.5 0 0010 3.5z" />
        <path d="M12.586 3.843a.75.75 0 00-1.06 0l-8.5 8.5a.75.75 0 000 1.06l2.122 2.122a.75.75 0 001.06 0l8.5-8.5a.75.75 0 000-1.06L12.586 3.843z" />
    </svg>
);

export const TextIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
        <path d="M5.25 3A2.25 2.25 0 003 5.25v9.5A2.25 2.25 0 005.25 17h9.5A2.25 2.25 0 0017 14.75v-9.5A2.25 2.25 0 0014.75 3h-9.5zM6 6.25a.75.75 0 01.75-.75h6.5a.75.75 0 010 1.5h-2.5v5.5a.75.75 0 01-1.5 0v-5.5h-2.5a.75.75 0 01-.75-.75z" />
    </svg>
);

export const LayoutIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
        <path d="M3 3.5A1.5 1.5 0 014.5 2h11A1.5 1.5 0 0117 3.5v13a1.5 1.5 0 01-1.5 1.5h-11A1.5 1.5 0 013 16.5v-13zM4.5 3h11v2.5H4.5V3zm0 13.5h11V14H4.5v2.5zM4.5 6.5h11v6.5H4.5V6.5z" />
    </svg>
);
