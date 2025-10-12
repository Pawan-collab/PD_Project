import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Loader2, X } from "lucide-react";
import { solutionService } from "@/services/solution.service";
import { useToast } from "@/hooks/use-toast";

const ICONS = [
  "Brain",
  "Zap",
  "MessageSquare",
  "Lightbulb",
  "Cog",
  "Shield",
  "Globe",
  "Users",
] as const;
const BADGES = ["none", "Popular", "Featured", "New", "Enterprise"] as const;
const COLORS = ["primary", "secondary", "accent"] as const;

const schema = yup.object({
  icon: yup
    .string()
    .required()
    .oneOf(ICONS as any),
  title: yup.string().required().min(3).max(100).trim(),
  description: yup.string().required().min(10).max(2000),
  features: yup.array().of(yup.string()).default([]),
  badge: yup
    .string()
    .oneOf(BADGES as any)
    .default("none"),
  color: yup
    .string()
    .oneOf(COLORS as any)
    .default("primary"),
  isActive: yup.boolean().default(true),
});

type FormData = yup.InferType<typeof schema>;

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export default function CreateSolutionModal({
  open,
  onOpenChange,
  onSuccess,
}: Props) {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      icon: "",
      title: "",
      description: "",
      features: [],
      badge: "none",
      color: "primary",
      isActive: true,
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      const submit = {
        ...data,
        badge: data.badge === "none" ? "" : data.badge,
      };
      await solutionService.createSolution(submit as any);
      toast({ title: "Solution created" });
      reset();
      onOpenChange(false);
      onSuccess?.();
    } catch (error) {
      toast({
        title: "Create failed",
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create Solution</DialogTitle>
          <DialogDescription>Fill solution details</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Icon</Label>
              <Controller
                name="icon"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select icon" />
                    </SelectTrigger>
                    <SelectContent>
                      {ICONS.map((i) => (
                        <SelectItem key={i} value={i}>
                          {i}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.icon && (
                <p className="text-sm text-red-500">{errors.icon.message}</p>
              )}
            </div>

            <div>
              <Label>Color</Label>
              <Controller
                name="color"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select color" />
                    </SelectTrigger>
                    <SelectContent>
                      {COLORS.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>

          <div>
            <Label>Title</Label>
            <Input {...register("title")} />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>

          <div>
            <Label>Description</Label>
            <Textarea {...register("description")} rows={4} />
            {errors.description && (
              <p className="text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Badge</Label>
              <Controller
                name="badge"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select badge" />
                    </SelectTrigger>
                    <SelectContent>
                      {BADGES.map((b) => (
                        <SelectItem key={b} value={b}>
                          {b}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div className="flex items-center gap-3">
              <Label>Visible</Label>
              <Controller
                name="isActive"
                control={control}
                render={({ field }) => (
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Solution"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
