import { Avatar, Card, CardContent, CircularProgress, Container, List, ListItem, ListItemText, Typography, Button } from "@mui/material";
import { useParams } from "react-router";
import { useDetails } from "../../data/hooks/useDetail";
import { useEffect } from "react";
import { Link } from "react-router";
import "./styles.css";
import { motion} from "framer-motion";

export default function Detail() {
  const { code } = useParams<{ code: string }>();
  const { response, getDetails } = useDetails();

  useEffect(() => {
    if (code) {
      getDetails(code);
    }
  }, [code]);

  if (!response || response.length === 0) {
    return (
      <Container className="detail-loading">
        <CircularProgress />
      </Container>
    );
  }

  const country = response[0];

   const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.4 }
    }),
  };

  return (
    <motion.div  custom={0}
        initial="hidden"
        animate="visible"
        variants={cardVariants}>
    <Container className="detail-container">
      <Card className="detail-card-header" elevation={10}>
        <Typography variant="h4" className="detail-country-name">
          {country.nome.abreviado}
        </Typography>
        <Avatar
          alt="Bandeira"
          src={`https://flagcdn.com/192x144/${country.id["ISO-3166-1-ALPHA-2"].toLowerCase()}.png`}
          className="detail-flag"
        />
      </Card>

      <Card className="detail-card-buttons" elevation={5}>
            <Button
            variant="contained"
            color="primary"
            className="detail-indicators-btn"
            component={Link}
            to={`/indicators/${country.id["ISO-3166-1-ALPHA-2"]}`}
          >
            Indicadores
            </Button>
            <Button
                variant="contained"
                color="primary"
                className="detail-home-btn"
                component={Link}
                to={'/home'}
            >
                Página incial
            </Button>
      </Card>

      <Card className="detail-card-info" elevation={5}>
        <CardContent>
          <List>
            <ListItem>
              <ListItemText
                primary="Sigla 1"
                secondary={country.id['ISO-3166-1-ALPHA-2']}
              />
              <ListItemText
                primary="Sigla 2"
                secondary={country.id['ISO-3166-1-ALPHA-3']}
              />
            </ListItem>
            <ListItem>
                <ListItemText primary="Nome" secondary={country.nome.abreviado} />
                <ListItemText primary="Nome em inglês" secondary={country.nome["abreviado-EN"]} />
                <ListItemText primary="Nome em espanhol" secondary={country.nome["abreviado-ES"]} />
            </ListItem>
            <ListItem>
                <ListItemText primary="Área" secondary={country.area.total +' '+ country.area.unidade.nome} />
                <ListItemText primary="Localização" secondary={country.localizacao["sub-regiao"].nome} />
            </ListItem>
            <ListItem>
                <ListItemText primary="Capital" secondary={country.governo.capital.nome} />
                <ListItemText primary="Moeda" secondary={country["unidades-monetarias"][0].nome} />
                <ListItemText primary="Língua Oficial" secondary={country.linguas[0].nome} />
            </ListItem>
          </List>
        </CardContent>
      </Card>
      <Card className="detail-card-history" elevation={5}>
        <CardContent>
          <Typography variant="h5" className="detail-history-title">
            Histórico
          </Typography>
          <Typography variant="body1" className="detail-history-text">
            {country.historico || "Histórico não disponível."}
          </Typography>
        </CardContent>
      </Card>
    </Container>
    </motion.div>
  );
}
