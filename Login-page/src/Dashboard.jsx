import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Dashboard = () => {
  const [permitData, setPermitData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchPermitData = async () => {
      try {
        const token = localStorage.getItem("jwtToken");

        const response = await axios.get("http://localhost:8080/permit-buttons", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // ✅ Log and extract data properly
        console.log("API response:", response.data);

        const data = Array.isArray(response.data)
          ? response.data
          : response.data?.data ?? [];

        if (!Array.isArray(data)) {
          toast.error("Invalid data received from server.");
          setPermitData([]);
        } else if (data.length === 0) {
          toast("No matching data found.");
          setPermitData([]);
        } else {
          setPermitData(data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load permit buttons. Are you logged in?");
      }
    };

    fetchPermitData();
  }, []);

  const filteredData = permitData.filter((item) =>
    item.userType?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <Card>
        <CardContent className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>

          <div className="mb-4">
            <Label htmlFor="search">Search by User Type</Label>
            <Input
              id="search"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search userType..."
            />
          </div>

          {filteredData.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-200 text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border px-4 py-2">User Type</th>
                    <th className="border px-4 py-2">Stage</th>
                    <th className="border px-4 py-2">Active BU</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((value, index) => (
                    <tr key={index}>
                      <td className="border px-4 py-2">{value.userType}</td>
                      <td className="border px-4 py-2">{value.stage}</td>
                      <td className="border px-4 py-2">{value.activeBu}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="mt-4 text-gray-500">No matching data found.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
