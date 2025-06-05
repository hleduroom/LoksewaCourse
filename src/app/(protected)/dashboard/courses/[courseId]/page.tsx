const page = async ({ params }: { params: Promise<{ courseId: string }> }) => {
  const { courseId } = await params;

  return <div>{courseId}</div>;
};

export default page;
