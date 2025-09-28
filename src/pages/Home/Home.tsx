import { useEffect, useState, type SetStateAction } from "react";
import { Container, TextField, Card, CardContent, Tooltip, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useHome } from "../../data/hooks/useHome";
import "./styles.css";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";

function Home() {
  const [search, setSearch] = useState("");
  const { response, getAllCountries } = useHome();

  useEffect(() => {
    getAllCountries();
  }, []);

  const filteredCountries = response.filter((country) =>
    country.nome.abreviado.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container className="home-container">
      <Typography variant="h2" className="home-title" sx={{ mb: 4 }}>
        Consulta de Países
      </Typography>
      <TextField
        className="home-search"
        fullWidth
        label="Pesquisar país"
        variant="outlined"
        value={search}
        onChange={(e: { target: { value: SetStateAction<string> } }) =>
          setSearch(e.target.value)
        }
      />

      <Grid className="home-grid" container spacing={3}>
        <AnimatePresence>
          {filteredCountries.map((country) => (
            <Grid
              key={country.id["ISO-3166-1-ALPHA-2"]}
            >
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <Card className="home-card" variant="outlined">
                  <Tooltip title={country.nome.abreviado} arrow>
                    <CardContent className="home-cardContent">
                      <Link
                        to={`/details/${country.id["ISO-3166-1-ALPHA-2"]}`}
                        className="home-link"
                      >
                        <img
                          className="home-flag"
                          src={
                            "https://flagcdn.com/192x144/" +
                            country.id["ISO-3166-1-ALPHA-2"].toLowerCase() +
                            ".png"
                          }
                          alt={country.nome.abreviado}
                        />
                      </Link>
                    </CardContent>
                  </Tooltip>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </AnimatePresence>
      </Grid>
    </Container>
  );
}

export default Home;
