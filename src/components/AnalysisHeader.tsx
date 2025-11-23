import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Edit2 } from "lucide-react";
import { useAnalysis } from "@/contexts/AnalysisContext";

interface AnalysisHeaderProps {
  title: string;
  description: string;
}

export function AnalysisHeader({ title, description }: AnalysisHeaderProps) {
  const navigate = useNavigate();
  const { setAnalysisData } = useAnalysis();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const handleNewAnalysis = () => {
    setShowConfirmDialog(true);
  };

  const handleConfirm = () => {
    setAnalysisData(null);
    setShowConfirmDialog(false);
    navigate("/");
  };

  return (
    <>
      <div className="flex items-start justify-between mb-6">
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-foreground mb-2">{title}</h1>
          <p className="text-muted-foreground">{description}</p>
        </div>
        <Button variant="outline" onClick={handleNewAnalysis} className="ml-4">
          <Edit2 className="h-4 w-4 mr-2" />
          Phân tích mới
        </Button>
      </div>

      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận phân tích mới</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn tạo phân tích mới? Tất cả dữ liệu phân tích hiện tại sẽ bị xóa và bạn sẽ được chuyển về màn hình nhập thông tin ban đầu.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirm}>Xác nhận</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

