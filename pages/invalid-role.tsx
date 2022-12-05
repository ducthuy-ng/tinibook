import Link from 'next/link';

export default function InvalidRole() {
  return (
    <div>
      <h2>Invalid Role. Please login again</h2>
      <div>
        Click <Link href={'/api/identity-access/logout'}>here</Link> to login as another role
      </div>
    </div>
  );
}
