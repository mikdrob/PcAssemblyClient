import logo from "./ShoppingCartLogo.png"

let cart: HTMLElement;
const speed = 500,
    curveDelay = 300,
    position = "fixed";

export async function addItem(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    let cartImage = new Image(10, 10);
    cartImage.src = logo;
    cart = document.getElementById("cart-button")!;
    let btnY =
        position === "fixed"
            ? e.currentTarget!.getBoundingClientRect().top
            : e.currentTarget!.offsetTop,
        btnX =
            position === "fixed"
                ? e.currentTarget!.getBoundingClientRect().left
                : e.currentTarget!.offsetLeft,
        flyingBtn = cartImage as HTMLElement;


    flyingBtn.classList.add("flyingBtn");
    flyingBtn.style.position = position;
    flyingBtn.style.top = `${btnY}px`;
    flyingBtn.style.left = `${btnX}px`;
    flyingBtn.style.opacity = "1";
    flyingBtn.style.transition = `all ${speed / 1000}s ease, top ${(speed +
        curveDelay) /
        1000}s ease, left ${speed / 1000}s ease, transform ${speed /
        1000}s ease ${(speed - 10) / 1000}s`;

    document.body.appendChild(flyingBtn);

    flyingBtn.style.top = `${cart.offsetTop + cart.offsetHeight - 16}px`;
    flyingBtn.style.left = `${cart.offsetLeft + cart.offsetWidth - 16}px`;
    flyingBtn.style.height = "3rem";
    flyingBtn.style.width = "3rem";
    flyingBtn.style.transform = "scale(0)";

    setTimeout(() => {
        flyingBtn.remove();
    }, speed * 1.5);
}