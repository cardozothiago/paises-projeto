import { useEffect } from "react";
import { Avatar, Box, Button, Card, Container, Typography } from "@mui/material";
import IndicadorCard from "../../components/IndicatorCard";
import { useIndicators } from "../../data/hooks/useIndicator";
import { Link, useParams } from "react-router";
import { motion } from "framer-motion";
import "./styles.css";

export default function Dashboard() {
  const { code } = useParams<{ code: string }>();
  const { dados, loading, error, getIndicators } = useIndicators();

  useEffect(() => {
    if (code) getIndicators(code);
  }, [code]);

  const categoriasFixas = [
    "Economia",
    "Indicadores Sociais",
    "Meio Ambiente",
    "População",
    "Redes",
    "Saúde",
  ];


const agruparPorCategoria = () => {
  const grupos: Record<string, typeof dados> = {};
  categoriasFixas.concat("Indicadores Sociais").forEach((cat) => (grupos[cat] = []));

  dados.forEach((item) => {
    const categoria = item.indicador.includes(" - ")
      ? item.indicador.split(" - ")[0].trim()
      : "Indicadores Sociais";

    const catKey = categoriasFixas.includes(categoria) ? categoria : "Indicadores Sociais";
    grupos[catKey].push(item);
  });

  return grupos;
};


  if (loading) return <Typography>Carregando indicadores...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  const grupos = agruparPorCategoria();

  return (
    <Container className="dashboard-container">
      <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={2}
      mb={4}>
      <Card className="detail-card-header" elevation={10}>
        <Typography variant="h4" className="detail-country-name">
          Indicadores de: {dados[0]?.series[0]?.pais.nome}
        </Typography>
        <Avatar
          alt="Bandeira"
          src={`https://flagcdn.com/192x144/${code?.toLowerCase()}.png`}
          className="detail-flag"
        />
      </Card>

      <Card className="detail-card-buttons" elevation={5}>
        <Button
          variant="contained"
          color="primary"
          className="detail-indicators-btn"
          component={Link}
          to={`/details/${code}`}
        >
          Informações do país
        </Button>
        <Button
          variant="contained"
          color="primary"
          className="detail-home-btn"
          component={Link}
          to="/home"
        >
          Página inicial
        </Button>
      </Card>
    </Box>
      {Object.keys(grupos).map(
        (categoria) =>
          grupos[categoria].length > 0 && (
            <div key={categoria}>
              <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
                {categoria}
              </Typography>

              <div className="category-cards">
                {grupos[categoria].map((indicador, index) => (
                  <motion.div
                    key={indicador.id}
                    className="card-wrapper"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <IndicadorCard
                      unidade={indicador.unidade}
                      titulo={indicador.indicador}
                      series={indicador.series[0]?.serie || []}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          )
      )}
    </Container>
  );
}
