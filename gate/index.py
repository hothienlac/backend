import grpc
import gate_control_pb2
import gate_control_pb2_grpc
import time

channel = grpc.insecure_channel('localhost:50007')

stub = gate_control_pb2_grpc.GateServiceStub(channel)


while True:
    time.sleep(2)
    goRequest = gate_control_pb2.GoRequest(userId = '1702005', goOut = True)
    result = stub.Go(goRequest)
    print({'accepted': result.accepted, 'message': result.message})

