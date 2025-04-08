import React from "react"

export default function Header() {
    return (
        <div
            style={{
                background: "linear-gradient(to right,#90e0ef, #48cae4, #0077b6)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 20,
                boxShadow: "rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px",
            }}>
            <div style={{
                fontSize: "40px",
                padding: "10px",
                fontWeight:"bolder",
            }}>
                <a href="/" style={{color:"black",textDecoration: "none"}}>SPACEPULSE</a>
            </div>
            <div style={{ padding: "0px 10px" }}>
                <button style={styles.buttons}> <b>Login</b> </button>
                <button style={styles.buttons}> <b>Signup</b></button>
            </div>
        </div >
    );
}

const styles = {
    buttons: {
        padding: "12px 20px 12px 20px",
        margin: "0px 20px",
        backgroundColor: "#000000",
        color: "white",
        borderRadius: 20,
        borderColor: "#2926ff",
    },
    anchors: {
        padding: 10,
        margin: "0px 10px",
    },
};
