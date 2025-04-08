import { Card, CardFooter, Skeleton } from "@nextui-org/react";
import img from "../../assets/images/imgprw.jpg";

function SkeletonCard({ index }) {
  return (
    <div
      key={index}
      className="w-auto space-y-5 p-4 border-1 border-gray-200 rounded-lg my-5"
    >
      <Skeleton className="rounded-lg w-max-screen">
        <div className="h-40 rounded-lg bg-default-300 "></div>
      </Skeleton>
      <div className="space-y-3">
        <Skeleton className="w-3/5 rounded-lg">
          <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
        </Skeleton>
        <Skeleton className="w-4/5 rounded-lg">
          <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
        </Skeleton>
        <Skeleton className="w-2/5 rounded-lg">
          <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
        </Skeleton>
      </div>
    </div>
  );
}

function SkeletonBigCard({ index }) {
  return (
    <Skeleton className="rounded-md bg-gray-400">
      <Card
        key={index}
        isPressable
        disableRipple
        radius="md"
        className="border-none bg-transparent my-5 "
      >
        <img
          src={img}
          alt="hotels"
          className="object-cover w-full bg-default-300"
        />
      </Card>
    </Skeleton>
  );
}

export { SkeletonCard, SkeletonBigCard };
