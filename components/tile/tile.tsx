import { Box } from "@radix-ui/themes";

export function Tile(props: any) {
  return (
    <Box width="4" height="4" className="inline">
      <div className={`w-10 h-10 bg-${props.color}`} >
      </div>
    </Box>
  )
}
