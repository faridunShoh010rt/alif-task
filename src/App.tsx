import { Container } from "@mui/system";
import { ModalComponent } from "./components/modal/modal.component";
import { TableComponent } from "./components/table/table.component";
import { Box, Button } from "@mui/material";
import { useState } from "react";
import { Navbar } from "./components/navbar/navbar.component";

function App() {
  const [isOpenedModal, setIsOpenedModal] = useState(false);
  const closeModal = () => {
    setIsOpenedModal(false);
  };

  const showModal = () => {
    setIsOpenedModal(true);
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="xl" component="div">
        <Box mt={4} mb={4} sx={{ textAlign: "right" }}>
          <Button
            sx={{ backgroundColor: "#673ab7" }}
            onClick={showModal}
            variant="contained"
            color="secondary"
          >
            Добавить
          </Button>
        </Box>
        <ModalComponent isOpen={isOpenedModal} onClose={closeModal} />
        <TableComponent />
      </Container>
    </>
  );
}

export default App;
