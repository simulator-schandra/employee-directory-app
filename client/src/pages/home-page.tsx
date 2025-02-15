import { Card } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Users, UserPlus, ClipboardEdit, Trash2, LogOut } from "lucide-react";

export default function HomePage() {
  const { logoutMutation, user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Welcome, {user?.username}!</h1>
          <Button
            variant="outline"
            onClick={() => logoutMutation.mutate()}
            disabled={logoutMutation.isPending}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link href="/employees/list">
            <Card className="p-6 hover:bg-gray-50 cursor-pointer">
              <Users className="w-12 h-12 mb-4 text-blue-500" />
              <h2 className="text-xl font-semibold">List Employees</h2>
              <p className="text-gray-600 mt-2">View all employee records</p>
            </Card>
          </Link>

          <Link href="/employees/add">
            <Card className="p-6 hover:bg-gray-50 cursor-pointer">
              <UserPlus className="w-12 h-12 mb-4 text-green-500" />
              <h2 className="text-xl font-semibold">Add Employee</h2>
              <p className="text-gray-600 mt-2">Create new employee records</p>
            </Card>
          </Link>

          <Link href="/employees/list">
            <Card className="p-6 hover:bg-gray-50 cursor-pointer">
              <ClipboardEdit className="w-12 h-12 mb-4 text-yellow-500" />
              <h2 className="text-xl font-semibold">Update Employee</h2>
              <p className="text-gray-600 mt-2">Modify existing records</p>
            </Card>
          </Link>

          <Link href="/employees/list">
            <Card className="p-6 hover:bg-gray-50 cursor-pointer">
              <Trash2 className="w-12 h-12 mb-4 text-red-500" />
              <h2 className="text-xl font-semibold">Delete Employee</h2>
              <p className="text-gray-600 mt-2">Remove employee records</p>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}
