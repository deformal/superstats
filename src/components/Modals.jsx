import { useEffect } from "react";
export default function Modals(props) {
  useEffect(() => {
    let modal = document.getElementById("modal");
    modal.style.display = "block";
    setTimeout(() => {
      modal.style.display = "none";
    }, 1500);
  });
  return (
    <div id="modal">
      <div id="modalInside">
        <h3>{props.message}</h3>
      </div>
    </div>
  );
}
