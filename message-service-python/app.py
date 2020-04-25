import grpc
import messenger_pb2
import messenger_pb2_grpc

channel = grpc.insecure_channel('34.87.63.155:50005')

stub = messenger_pb2_grpc.MessengerServiceStub(channel)

receive_request = messenger_pb2.ReceiveRequest()

for message in stub.ReceiveMessage(receive_request):
    print(message)
