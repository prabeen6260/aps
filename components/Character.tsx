import dynamic from 'next/dynamic';
import TextToSpeech from '../components/TextToSpeech';
import ASLChatbot from '../components/ASLChatbot';

const SplineScene = dynamic(() => import('../components/SplineScene'), {
  ssr: false,
  loading: () => <p>Loading 3D scene...</p>
});

export default function Home() {
  return (
    <main className='w-full h-screen'>
      <SplineScene />
      <ASLChatbot />
    </main>
  );
}