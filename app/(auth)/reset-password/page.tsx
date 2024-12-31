import dynamic from 'next/dynamic';

const ResetPasswordPage = dynamic(() => import('./ResetPasswordComponent'), { ssr: false });

export default ResetPasswordPage; 