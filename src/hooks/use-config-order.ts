import { useConfig } from "@/contexts/config";


export function useConfigOrder() {
  const config = useConfig();
  return config.getOrder();
}
