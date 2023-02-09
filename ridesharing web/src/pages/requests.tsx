import { withUrqlClient } from "next-urql";
import { Layout } from "../components/Layout";
import { CreateUrqlClient } from "../utils/createUrqlClient";

const Requests = () => {
  return (
    <Layout variant="regular" top>
      <div>
        <ul>
          <li>Ride One</li>
          <li>Ride Two</li>
          <li>Ride Three</li>
          <li>Ride Four</li>
          <li>Ride Five</li>
        </ul>
      </div>
    </Layout>
  );
};

export default withUrqlClient(CreateUrqlClient, { ssr: true })(Requests);
