import { useId } from 'react';

/**
 * generate an automatic id if needed, joined with name if truthy
 *
 * @param id
 * @param name
 */
export function useInputId(
  id: string | null | undefined,
  name: string | null | undefined,
) {
  const reactId = useId();

  // if id, keep id as finalId for predictable behavior
  // if name, join name with reactId to simplify debug in devtools
  // else reactId
  return id ?? (name ? `${name}_${reactId}` : reactId);
}
