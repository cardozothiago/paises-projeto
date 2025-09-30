import { Card, CardContent, Typography } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { Unidade, SerieEntry } from "../utils/interfaces/Indicators";
import "./styles.css"; 

interface IndicadorCardProps {
  titulo: string;
  unidade: Unidade;
  series: SerieEntry[];
  cor?: string;
}

export default function IndicadorCard({
  titulo,
  unidade,
  series,
  cor = "#48aedd",
}: IndicadorCardProps) {
  const safeUnidade = unidade || { id: "", classe: "", multiplicador: 1 };

  const data = series
    ?.map((entry) => {
      if (!entry) return null;

      const [key, value] = Object.entries(entry)[0];

      if (key === "-" || value === null) return null;

      let valorNumerico: number;
      let valorOriginal: string;

      if (value.startsWith("<")) {
        valorOriginal = value;
        const parsed = parseFloat(value.replace(",", ".").replace("<", "").trim());
        valorNumerico = isNaN(parsed) ? 0 : parsed;
      } else {
        valorOriginal = value;
        valorNumerico = parseFloat(value.replace(",", ".").trim()) * safeUnidade.multiplicador;
      }

      return { ano: key, valor: valorNumerico, display: valorOriginal };
    })
    .filter((d): d is { ano: string; valor: number; display: string } => Boolean(d));

  return (
    <Card sx={{ mb: 3, height: 350 }} className="dark-card">
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {titulo} {safeUnidade.id && `(${safeUnidade.id})`}
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="ano" />
            <YAxis
              label={{ value: safeUnidade.id, angle: -90, position: "insideLeft" }}
            />
            <Tooltip formatter={(_, __, entry) => entry?.payload?.display + ` ${safeUnidade.id}`}/>
            <Legend />
            <Bar dataKey="valor" fill={cor} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
