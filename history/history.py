from concurrent import futures
import argparse
import os
import sys
import time
import grpc
from jinja2 import Environment, FileSystemLoader, select_autoescape, TemplateError
from google.api_core.exceptions import GoogleAPICallError

import history_pb2
import history_pb2_grpc
from grpc_health.v1 import health_pb2
from grpc_health.v1 import health_pb2_grpc


import logging
logger=logging.getLogger()
logger.setLevel(logging.DEBUG)


class History:
    def __init__(self):
        pass

    def getHistory(self, request_iterator, context):
        t = 0
        while True:
            t = t + 1
            time.sleep(2)
            yield history_pb2.HistoryRespond(id = '1702005', name = 'Ho Thien Lac', time = t.__str__())

if __name__ == '__main__':
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    service = History()
    history_pb2_grpc.add_HistoryServicer_to_server(service ,server)
    server.add_insecure_port('localhost:50052')
    server.start()
    logger.info('Server Started')
    try:
        while True:
            time.sleep(3600)
    except KeyboardInterrupt:
        server.stop(0)
