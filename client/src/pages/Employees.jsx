import { Plus, Search, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { DEPARTMENTS, dummyEmployeeData } from "../assets/assets";
import EmployeeCard from "../components/EmployeeCard";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedDept, setSelectedDept] = useState("");
  const [editEmployee, setEditEmployee] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const fetchEmployees = useCallback(async () => {
    setLoading(true);
    setEmployees(
      dummyEmployeeData.filter((emp) =>
        selectedDept ? emp.department === selectedDept : emp,
      ),
    );
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const filtered = employees.filter((emp) =>
    `${emp.firstName} ${emp.lastName} ${emp.position}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );
  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="page-title">Employees</h1>
          <p className="page-subtitle">Manage your team members</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="btn-primary flex items-center gap-2 w-full sm:w-auto justify-center"
        >
          <Plus size={16} />
          Add Employee
        </button>
      </div>

      {/* Search bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            placeholder="Search employees..."
            className="w-full pl-10!"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
        </div>
        <select
          className="max-w-40"
          onChange={(e) => setSelectedDept(e.target.value)}
          value={selectedDept}
        >
          <option value="">All Departments</option>
          {DEPARTMENTS.map((deptName) => (
            <option key={deptName} value={deptName}>
              {deptName}
            </option>
          ))}
        </select>
      </div>

      {/* Employee cards */}
      {loading ? (
        <div className="flex justify-center p-12">
          <div className="animate-spin h-8 w-8 border-2 border-indigo-600 border-t-transparent rounded-full"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {filtered.length === 0 ? (
            <p className="col-span-full text-center py-16 text-slate-400 bg-white rounded-2xl border-dashed border-slate-200">
              No Employees Found
            </p>
          ) : (
            filtered.map((emp) => (
              <EmployeeCard
                key={emp.id}
                employee={emp}
                onDelete={fetchEmployees}
                onEdit={(e) => setEditEmployee(e)}
              />
            ))
          )}
        </div>
      )}

      {/* Create Employee Modal */}
      {showCreateModal && (
        <div
          className="fixed bg-black/40 backdrop-blur-sm inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto"
          onClick={() => setShowCreateModal(false)}
        >
          <div className="fixed inset-0" />

          <div
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl my-8 animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 pb-0">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Add New Employee
                </h2>
                <p className="text-sm text-slate-500 mt-0.5">
                  Create a user account and employee profile
                </p>
              </div>

              <button
                onClick={(e) => setShowCreateModal(false)}
                className="p-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* form & buttons */}
            <div className="p-6">
              <form className="space-y-6 max-w-3xl animate-fade-in">
                <div className="card p-5 sm:p-6">
                  <h3 className="font-medium mb-6 pb-4 border-b border-slate-100">
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm text-slate-700">
                    <div>
                      <label className="block mb-2">First Name</label>
                      <input required name="firstName" />
                    </div>
                    <div>
                      <label className="block mb-2">Last Name</label>
                      <input required name="lastName" />
                    </div>
                    <div>
                      <label className="block mb-2">Phone Number</label>
                      <input required name="phone" />
                    </div>
                    <div>
                      <label className="block mb-2">Join Date</label>
                      <input
                        required
                        type="date"
                        defaultValue
                        name="joinDate"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block mb-2">Bio (Optional)</label>
                      <textarea
                        name="bio"
                        rows={3}
                        className="resize-none"
                        placeholder="Brief description..."
                        defaultValue={""}
                      />
                    </div>
                  </div>
                </div>
                <div className="card p-5 sm:p-6">
                  <h3 className="text-base font-medium text-slate-900 mb-6 pb-4 border-b border-slate-100">
                    Employment Details
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm text-slate-700">
                    <div>
                      <label className="block mb-2">Department</label>
                      <select name="department">
                        <option value selected>
                          Select Department
                        </option>
                        <option value="Engineering">Engineering</option>
                        <option value="Human Resources">Human Resources</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Sales">Sales</option>
                        <option value="Finance">Finance</option>
                        <option value="Operations">Operations</option>
                        <option value="IT Support">IT Support</option>
                        <option value="Customer Success">
                          Customer Success
                        </option>
                        <option value="Product Management">
                          Product Management
                        </option>
                        <option value="Design">Design</option>
                      </select>
                    </div>
                    <div>
                      <label className="block mb-2">Position</label>
                      <input required name="position" />
                    </div>
                    <div>
                      <label className="block mb-2">Basic Salary</label>
                      <input
                        required
                        min={0}
                        step="0.01"
                        type="number"
                        defaultValue={0}
                        name="basicSalary"
                      />
                    </div>
                    <div>
                      <label className="block mb-2">Allowances</label>
                      <input
                        min={0}
                        step="0.01"
                        required
                        type="number"
                        defaultValue={0}
                        name="allowances"
                      />
                    </div>
                    <div>
                      <label className="block mb-2">Deductions</label>
                      <input
                        min={0}
                        step="0.01"
                        required
                        type="number"
                        defaultValue={0}
                        name="deductions"
                      />
                    </div>
                  </div>
                </div>
                <div className="card p-5 sm:p-6">
                  <h3 className="text-base font-medium text-slate-900 mb-6 pb-4 border-b border-slate-100">
                    Account Setup
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm text-slate-700">
                    <div className="sm:col-span-2">
                      <label className="block mb-2">Work Email</label>
                      <input required type="email" name="email" />
                    </div>
                    <div>
                      <label className="block mb-2">Temporary Password</label>
                      <input required type="password" name="password" />
                    </div>
                    <div>
                      <label className="block mb-2">System Role</label>
                      <select name="role">
                        <option value="EMPLOYEE" selected>
                          Employee
                        </option>
                        <option value="ADMIN">Admin</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-2">
                  <button type="button" className="btn-secondary">
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary flex items-center justify-center"
                  >
                    Create Employee
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Edit Employee Modal */}
      {editEmployee && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto bg-black/40 backdrop-blur-sm"
          onClick={() => setEditEmployee(false)}
        >
          <div
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl my-8 animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 pb-0">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Edit Employee
                </h2>
                <p className="text-sm text-slate-500 mt-0.5">
                  Update employee details
                </p>
              </div>

              <button
                onClick={(e) => setEditEmployee(false)}
                className="p-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* form & buttons */}
            <div className="p-6">
              <form className="space-y-6 max-w-3xl animate-fade-in">
                <div className="card p-5 sm:p-6">
                  <h3 className="font-medium mb-6 pb-4 border-b border-slate-100">
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm text-slate-700">
                    <div>
                      <label className="block mb-2">First Name</label>
                      <input required defaultValue="James" name="firstName" />
                    </div>
                    <div>
                      <label className="block mb-2">Last Name</label>
                      <input required defaultValue="Thomas" name="lastName" />
                    </div>
                    <div>
                      <label className="block mb-2">Phone Number</label>
                      <input required defaultValue={7878787878} name="phone" />
                    </div>
                    <div>
                      <label className="block mb-2">Join Date</label>
                      <input
                        required
                        type="date"
                        defaultValue="2026-04-02"
                        name="joinDate"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block mb-2">Bio (Optional)</label>
                      <textarea
                        name="bio"
                        rows={3}
                        className="resize-none"
                        placeholder="Brief description..."
                        defaultValue={""}
                      />
                    </div>
                  </div>
                </div>
                <div className="card p-5 sm:p-6">
                  <h3 className="text-base font-medium text-slate-900 mb-6 pb-4 border-b border-slate-100">
                    Employment Details
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm text-slate-700">
                    <div>
                      <label className="block mb-2">Department</label>
                      <select name="department">
                        <option value>Select Department</option>
                        <option value="Engineering">Engineering</option>
                        <option value="Human Resources">Human Resources</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Sales" selected>
                          Sales
                        </option>
                        <option value="Finance">Finance</option>
                        <option value="Operations">Operations</option>
                        <option value="IT Support">IT Support</option>
                        <option value="Customer Success">
                          Customer Success
                        </option>
                        <option value="Product Management">
                          Product Management
                        </option>
                        <option value="Design">Design</option>
                      </select>
                    </div>
                    <div>
                      <label className="block mb-2">Position</label>
                      <input
                        required
                        defaultValue="Marketing"
                        name="position"
                      />
                    </div>
                    <div>
                      <label className="block mb-2">Basic Salary</label>
                      <input
                        required
                        min={0}
                        step="0.01"
                        type="number"
                        defaultValue={30000}
                        name="basicSalary"
                      />
                    </div>
                    <div>
                      <label className="block mb-2">Allowances</label>
                      <input
                        min={0}
                        step="0.01"
                        required
                        type="number"
                        defaultValue={300}
                        name="allowances"
                      />
                    </div>
                    <div>
                      <label className="block mb-2">Deductions</label>
                      <input
                        min={0}
                        step="0.01"
                        required
                        type="number"
                        defaultValue="299.99"
                        name="deductions"
                      />
                    </div>
                    <div>
                      <label className="block mb-2">Status</label>
                      <select name="employmentStatus">
                        <option value="ACTIVE" selected>
                          Active
                        </option>
                        <option value="INACTIVE">Inactive</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="card p-5 sm:p-6">
                  <h3 className="text-base font-medium text-slate-900 mb-6 pb-4 border-b border-slate-100">
                    Account Setup
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm text-slate-700">
                    <div className="sm:col-span-2">
                      <label className="block mb-2">Work Email</label>
                      <input
                        required
                        type="email"
                        defaultValue="tem1@gmail.com"
                        name="email"
                      />
                    </div>
                    <div>
                      <label className="block mb-2">
                        Change Password (Optional)
                      </label>
                      <input
                        placeholder="Leave blank to keep current"
                        type="password"
                        name="password"
                      />
                    </div>
                    <div>
                      <label className="block mb-2">System Role</label>
                      <select name="role">
                        <option value="EMPLOYEE" selected>
                          Employee
                        </option>
                        <option value="ADMIN">Admin</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-2">
                  <button type="button" className="btn-secondary">
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary flex items-center justify-center"
                  >
                    Update Employee
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Employees;
