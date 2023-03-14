const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const packageDefinition = protoLoader.loadSync("./todo.proto", {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
var todoService = protoDescriptor.TodoService;

const client = new todoService(
  "localhost:50051",
  grpc.credentials.createInsecure()
);

client.listTodos({}, (err, todos) => {
  if (!err) {
    console.log(todos);
  } else {
    console.log(err);
  }
});

// client.createTodo(
//   { id: 4, title: "todo4", content: "content4" },
//   (err, todo) => {
//     if (!err) {
//       console.log("successfully created a new todo!");
//     } else {
//       console.log(err);
//     }
//   }
// );
