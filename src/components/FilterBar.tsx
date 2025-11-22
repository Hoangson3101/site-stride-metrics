import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar, Download } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

interface FilterBarProps {
  showCompetitors?: boolean;
  showDateRange?: boolean;
  onExport?: () => void;
}

export function FilterBar({ showCompetitors = true, showDateRange = true, onExport }: FilterBarProps) {
  const [selectedCompetitors, setSelectedCompetitors] = useState<string[]>(["comp1", "comp2"]);

  const competitors = [
    { id: "comp1", name: "competitor1.com", rank: 1 },
    { id: "comp2", name: "competitor2.com", rank: 2 },
    { id: "comp3", name: "competitor3.com", rank: 3 },
  ];

  const toggleCompetitor = (id: string) => {
    setSelectedCompetitors(prev => 
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  return (
    <Card className="p-4 bg-surface-soft border-0 shadow-soft">
      <div className="flex flex-wrap items-end gap-4">
        {/* Domain/Project Selector */}
        <div className="space-y-2 min-w-[200px]">
          <Label className="text-sm font-medium">Website phân tích</Label>
          <Select defaultValue="main">
            <SelectTrigger className="h-10">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="main">mywebsite.com</SelectItem>
              <SelectItem value="site2">project2.com</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Date Range */}
        {showDateRange && (
          <div className="space-y-2 min-w-[200px]">
            <Label className="text-sm font-medium">Khoảng thời gian</Label>
            <Select defaultValue="all">
              <SelectTrigger className="h-10">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toàn thời gian</SelectItem>
                <SelectItem value="3m">3 tháng gần nhất</SelectItem>
                <SelectItem value="6m">6 tháng gần nhất</SelectItem>
                <SelectItem value="12m">12 tháng gần nhất</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Competitors */}
        {showCompetitors && (
          <div className="space-y-2">
            <Label className="text-sm font-medium">Đối thủ so sánh</Label>
            <div className="flex gap-4">
              {competitors.map((comp) => (
                <label key={comp.id} className="flex items-center gap-2 cursor-pointer">
                  <Checkbox
                    checked={selectedCompetitors.includes(comp.id)}
                    onCheckedChange={() => toggleCompetitor(comp.id)}
                  />
                  <span className="text-sm text-foreground">#{comp.rank} {comp.name}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Export Button */}
        {onExport && (
          <Button variant="outline" onClick={onExport} className="ml-auto">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        )}
      </div>
    </Card>
  );
}
