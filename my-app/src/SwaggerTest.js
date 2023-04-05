// import SwaggerUI from "swagger-ui-react"
// import "swagger-ui-react/swagger-ui.css"

// function Swagger() {
//     return (
//       <div>
//         <SwaggerUI url="https://petstore.swagger.io/v2/swagger.json" />
//       </div>
//     );
// }
// export default Swagger;
import React from 'react';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

const Swagger = () => {
  return (
    <div>
      <SwaggerUI url="http://localhost:3002/rootEqation" />
    </div>
  );
};

export default Swagger;

