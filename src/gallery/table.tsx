import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const rows = [
  { id: 'INV-001', client: 'Acme Inc.', status: 'Paid', total: '$1,200' },
  { id: 'INV-002', client: 'Globex', status: 'Pending', total: '$640' },
  { id: 'INV-003', client: 'Initech', status: 'Paid', total: '$2,310' },
]

export default function TableDemo() {
  return (
    <Table className="w-96">
      <TableHeader>
        <TableRow>
          <TableHead>Invoice</TableHead>
          <TableHead>Client</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Total</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.id}>
            <TableCell className="font-medium">{row.id}</TableCell>
            <TableCell>{row.client}</TableCell>
            <TableCell>
              <Badge variant={row.status === 'Paid' ? 'secondary' : 'outline'}>
                {row.status}
              </Badge>
            </TableCell>
            <TableCell className="text-right">{row.total}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
