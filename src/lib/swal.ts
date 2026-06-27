import Swal from "sweetalert2";

export const successPopup = (title: string, text: string) => {
  return Swal.fire({
    icon: "success",
    title,
    text,
    confirmButtonText: "تمام",
    confirmButtonColor: "#d4af37",
    background: "#15111f",
    color: "#fff",
  });
};

export const errorPopup = (title: string, text: string) => {
  return Swal.fire({
    icon: "error",
    title,
    text,
    confirmButtonText: "تمام",
    confirmButtonColor: "#d4af37",
    background: "#15111f",
    color: "#fff",
  });
};

export const warningPopup = (title: string, text: string) => {
  return Swal.fire({
    icon: "warning",
    title,
    text,
    confirmButtonText: "تمام",
    confirmButtonColor: "#d4af37",
    background: "#15111f",
    color: "#fff",
  });
};