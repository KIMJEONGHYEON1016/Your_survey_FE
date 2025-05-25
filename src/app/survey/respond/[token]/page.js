import RespondContainer from '@/survey/containers/RespondContainer';

export default function RespondPage({ params }) {
  return <RespondContainer token={params.token} />;
}
