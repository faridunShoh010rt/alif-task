import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { IUser } from "../../types/user.type";
import { IModalComponentProps } from "./modal.type";
import { useAppDispatch } from "../../hooks/store.hook";
import { createUsers } from "../../store/reducers/user.slice";
import "./modal.style.css";

export const ModalComponent: React.FC<IModalComponentProps> = (
  props: IModalComponentProps
) => {
  const { isOpen, onClose } = props;
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<IUser>({ mode: "onBlur" });

  const closeMessageSuccess = () => {
    setIsSuccess(false);
  };

  const closeDialog = () => {
    reset();
    onClose();
  };

  const onSubmit = async (user: IUser) => {
    setDisabled(true);
    await dispatch(createUsers(user));
    closeDialog();
    setDisabled(false);
    setIsSuccess(true);
  };

  return (
    <>
      <Dialog maxWidth="sm" open={isOpen} onClose={closeDialog}>
        <DialogTitle>Создать пользователя</DialogTitle>
        <DialogContent sx={{ width: 500 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl sx={{ marginBottom: 2, marginTop: 2 }} fullWidth>
              <TextField
                error={!!errors?.name?.message}
                label="Имя"
                {...register("name", {
                  required: { value: true, message: "Обязательное поля" },
                  maxLength: { value: 20, message: "Максимум 20 символов" },
                  minLength: { value: 3, message: "Минимум 3 символа" },
                })}
              />
              <span>{errors?.name?.message}</span>
            </FormControl>
            <FormControl sx={{ marginBottom: 2 }} fullWidth>
              <TextField
                error={!!errors?.lastName?.message}
                label="Фамилия"
                {...register("lastName", {
                  required: { value: true, message: "Обязательное поля" },
                  maxLength: { value: 40, message: "Максимум 20 символов" },
                  minLength: { value: 5, message: "Минимум 5 символов" },
                })}
              />
              <span>{errors?.lastName?.message}</span>
            </FormControl>
            <FormControl sx={{ marginBottom: 2 }} fullWidth>
              <TextField
                error={!!errors?.age?.message}
                label="Возрость"
                type="number"
                {...register("age", {
                  required: { value: true, message: "Обязательное поля" },
                })}
              />
              <span>{errors?.age?.message}</span>
            </FormControl>
            <FormControl sx={{ marginBottom: 2 }} fullWidth>
              <TextField
                error={!!errors?.phone?.message}
                label="Телефон"
                {...register("phone", {
                  required: { value: true, message: "Обязательное поля" },
                })}
              />
              <span>{errors?.phone?.message}</span>
            </FormControl>
            <FormControl sx={{ marginBottom: 2 }} fullWidth>
              <TextField
                error={!!errors?.address?.message}
                label="Адрес"
                {...register("address", {
                  required: { value: true, message: "Обязательное поля" },
                })}
              />
              <span>{errors?.address?.message}</span>
            </FormControl>
            <DialogActions>
              <Button
                disabled={!isValid || disabled}
                type="submit"
                variant="outlined"
                color="secondary"
              >
                Добавить
              </Button>
              <Button onClick={closeDialog} variant="outlined" color="error">
                Закрыть
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={isSuccess}
        autoHideDuration={6000}
        onClose={closeMessageSuccess}
      >
        <Alert
          onClose={closeMessageSuccess}
          severity="success"
          sx={{ width: "100%" }}
        >
          Пользователь добавлен
        </Alert>
      </Snackbar>
    </>
  );
};
