export default function auth(sock, clbk,errclbk) {
  sock.on("auth", () => {
    fetch("/auth",{method:"post", credentials:"include"})
      .then(res => res.json())
      .then(data => {
          console.log(data)
          if(data) {
            sock.emit("setEvents");
            clbk();
          }
          else errclbk();
      })
      .catch(err=>errclbk());
  });
  sock.on("authed", clbk);
}
