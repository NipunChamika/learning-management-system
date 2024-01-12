import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";

const Login = () => {
  return (
    <>
      <div>
        <Card
          title="Login"
          className="min-w-[440px]"
          style={{ width: "440px", padding: "3px" }}
        >
          <form>
            <div className="flex flex-col">
              <label htmlFor="email">Email</label>
              <InputText id="email" />
              <label htmlFor="password">Password</label>
              <InputText id="password" />
            </div>
          </form>
        </Card>
      </div>
    </>
  );
};

export default Login;
