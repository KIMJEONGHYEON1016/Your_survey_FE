import ManageContainer from '@/survey/containers/ManageContainer';

export default function ManagePage({ params }) {
  return <ManageContainer token={params.token} />;
}