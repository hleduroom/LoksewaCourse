import { getServices } from "@/modules/admin/services/action";
import AddServiceDialog from "@/modules/admin/services/form/add-service-dialog";
import ServiceTable from "@/modules/admin/services/table";

import Container from "@/components/global/container";

export default async function page() {
  const services = await getServices();

  return (
    <Container className="flex flex-col gap-4">
      <div className="flex items-center justify-end">
        <AddServiceDialog />
      </div>

      <ServiceTable data={services} />
    </Container>
  );
}
