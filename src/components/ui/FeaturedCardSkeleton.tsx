import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";   
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export const FeaturedCardSkeleton = ({ className }: { className?: string }) => {
      return (
      <Card className={cn(
        "h-full flex flex-col transition-all duration-300 border",
        className || "bg-white"
      )}>
        <CardHeader className="pb-0 pt-6 space-y-0 text-center">
          <div className="mx-auto">
            <Skeleton className="w-12 h-12 rounded-full bg-gray-200 mx-auto" />
          </div>
          <Skeleton className="h-6 w-36 mt-5 mb-2 mx-auto rounded-md bg-gray-200" />
        </CardHeader>
        
        <CardContent className="flex-grow py-2 px-5">
          <Skeleton className="h-4 w-full my-1 rounded bg-gray-100" />
          <Skeleton className="h-4 w-5/6 my-1 mx-auto rounded bg-gray-100" />
          <Skeleton className="h-4 w-4/6 my-1 mx-auto rounded bg-gray-100" />
        </CardContent>
        
        <CardFooter className="pt-2 pb-6 flex justify-center">
          <Skeleton className="h-10 w-28 rounded-full bg-gray-200" />
        </CardFooter>
      </Card>
    );
}