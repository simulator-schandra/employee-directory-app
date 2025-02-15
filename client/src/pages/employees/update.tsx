import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  insertEmployeeSchema,
  type InsertEmployee,
  type Employee,
} from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Loader2, ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";

export default function UpdateEmployee() {
  const { toast } = useToast();
  const [location, setLocation] = useLocation();
  const employeeId = parseInt(location.split("/").pop() || "0");

  const { data: employee, isLoading: isLoadingEmployee } = useQuery<Employee>({
    queryKey: [`/api/employees/${employeeId}`],
  });

  const form = useForm<InsertEmployee>({
    resolver: zodResolver(insertEmployeeSchema),
    values: employee,
  });

  const mutation = useMutation({
    mutationFn: async (data: InsertEmployee) => {
      const res = await apiRequest(
        "PATCH",
        `/api/employees/${employeeId}`,
        data
      );
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/employees"] });
      toast({ title: "Employee updated successfully" });
      setLocation("/employees/list");
    },
    onError: (error) => {
      toast({
        title: "Failed to update employee",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  if (isLoadingEmployee) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">Employee Not Found</h2>
          <Button onClick={() => setLocation("/employees/list")}>
            Back to List
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <Button variant="outline" onClick={() => setLocation("/employees/list")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to List
        </Button>

        <Card>
          <CardHeader>
            <CardTitle>Update Employee</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={form.handleSubmit((data) => mutation.mutate(data))}
              className="space-y-4"
            >
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input {...form.register("name")} />
                {form.formState.errors.name && (
                  <p className="text-sm text-red-500 mt-1">
                    {form.formState.errors.name.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="position">Position</Label>
                <Input {...form.register("position")} />
                {form.formState.errors.position && (
                  <p className="text-sm text-red-500 mt-1">
                    {form.formState.errors.position.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="department">Department</Label>
                <Input {...form.register("department")} />
                {form.formState.errors.department && (
                  <p className="text-sm text-red-500 mt-1">
                    {form.formState.errors.department.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input type="email" {...form.register("email")} />
                {form.formState.errors.email && (
                  <p className="text-sm text-red-500 mt-1">
                    {form.formState.errors.email.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input {...form.register("phone")} />
                {form.formState.errors.phone && (
                  <p className="text-sm text-red-500 mt-1">
                    {form.formState.errors.phone.message}
                  </p>
                )}
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setLocation("/employees/list")}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={mutation.isPending}>
                  {mutation.isPending ? (
                    <Loader2 className="animate-spin mr-2" />
                  ) : null}
                  Update Employee
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
