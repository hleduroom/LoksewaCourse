import { Suspense } from "react";

import Container from "@/components/global/container";
import StudentsTable from "@/components/table/students/table";

import { getUsers } from "@/actions/users";

export default async function Admin() {
  const data = await getUsers();

  return (
    <div>
      <Container>
        <Suspense fallback={<p>LOADING...</p>}>
          <StudentsTable data={data} />
        </Suspense>
      </Container>
    </div>
  );
}
