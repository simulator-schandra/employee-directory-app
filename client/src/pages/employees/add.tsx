import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { insertEmployeeSchema, type InsertEmployee } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Loader2 } from "lucide-react";
import { useLocation } from "wouter";

export default function AddEmployee() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  
  const form = useForm<InsertEmployee>({
    resolver: zodResolver(insertEmployeeSchema),
  });

  const mutation = useMutation({
    mutationFn: async (employee: InsertEmployee) => {
      const res = await apiRequest("POST", "/api/employees", employee);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/employees"] });
      toast({ title: "Employee added successfully" });
      setLocation("/employees/list");
    },
    onError: (error) => {
      toast({
        title: "Failed to add employee",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Add New Employee</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={form.handleSubmit((data) => mutation.mutate(data))}
              className="space-y-4"
            >
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input {...form.register("name")} />
              </div>
              <div>
                <Label htmlFor="position">Position</Label>
                <Input {...form.register("position")} />
              </div>
              <div>
                <Label htmlFor="department">Department</Label>
                <Input {...form.register("department")} />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input type="email" {...form.register("email")} />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input {...form.register("phone")} />
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setLocation("/")}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={mutation.isPending}>
                  {mutation.isPending ? (
                    <Loader2 className="animate-spin mr-2" />
                  ) : null}
                  Add Employee
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
