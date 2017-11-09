@extends('layouts.app')


@section('content') 
  
<div id="wrapper">

        <div id="page-wrapper">
        	<div class="row">
                <div class="col-lg-12">
                    <h1 class="page-header">Client Node Status</h1>
                </div>
                <!-- /.col-lg-12 -->
            </div>
            <!-- /.row -->
            <div class="row">
                <div class="col-lg-12 col-md-12 col-sm-12">
                    <div class="panel panel-danger" id="mqtt-panel">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-xs-3">
                                    <i class="fa fa-close fa-5x" id="mqtt-icon"></i> <!-- fa-close -->
                                </div>
                                <div class="col-xs-9 text-right">
                                    <div class="huge" id="mqtt-status">-</div>
                                    <div>Broker Connection</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            @component('layouts.sidebar')
                        @endcomponent

            <!-- /.row -->
            <div class="row">
                <!-- /.col-lg-6 -->
                <div class="col-lg-6">
                    
                    <div class="panel-heading">
                        <i class="fa fa-tasks fa-fw"></i> Waiting for Order
                    </div>
                    <!-- /.panel-heading -->
                    <div class="panel-body">
                        <div class="list-group">
                            <a href="#" class="list-group-item">
                                <i class="fa fa-shopping-cart fa-fw"></i> Client 1
                                <span class="pull-right text-muted small"><em>9:49 AM</em>
                                </span>
                            </a>
                            <a href="#" class="list-group-item">
                                <i class="fa fa-shopping-cart fa-fw"></i> Client 3
                                <span class="pull-right text-muted small"><em>9:52 AM</em>
                                </span>
                            </a>
                        </div>
                        <!-- /.list-group -->
                        <a href="#" class="btn btn-danger btn-block">Dequeue</a>
                    </div>
                    <!-- /.panel-body -->
                </div>
                <!-- firsy panel -->
                <div class="col-lg-6">
                    
                    <div class="panel-heading">
                        <i class="fa fa-bell fa-fw"></i> Waiting for Queue
                    </div>
                    <!-- /.panel-heading -->
                    <div class="panel-body">
                        <div class="list-group">
                            <a href="#" class="list-group-item">
                                <i class="fa fa-comment fa-fw"></i> Client 2
                                <span class="pull-right text-muted small"><em>4 minutes ago</em>
                                </span>
                            </a>
                        </div>
                        <!-- /.list-group -->

                    </div>
                    <!-- /.panel-body -->
                </div>
            </div>
            <!-- /.row -->
        </div>
        <!-- /#page-wrapper -->

    </div>
    <!-- /#wrapper -->


        <!-- jQuery -->
        <script src="sbadmin2/vendor/jquery/jquery.min.js"></script>

    <!-- Bootstrap Core JavaScript -->
    <script src="sbadmin2/vendor/bootstrap/js/bootstrap.min.js"></script>

    <!-- Metis Menu Plugin JavaScript -->
    <script src="sbadmin2/vendor/metisMenu/metisMenu.min.js"></script>

    <!-- Vue JS -->
    <!-- <script src="https://unpkg.com/vue"></script> -->

    <!-- Flot Charts JavaScript -->
    <script src="sbadmin2/vendor/flot/excanvas.min.js"></script>
    <script src="sbadmin2/vendor/flot/jquery.flot.js"></script>
    <script src="sbadmin2/vendor/flot/jquery.flot.pie.js"></script>
    <script src="sbadmin2/vendor/flot/jquery.flot.resize.js"></script>
    <script src="sbadmin2/vendor/flot/jquery.flot.time.js"></script>
    <script src="sbadmin2/vendor/flot-tooltip/jquery.flot.tooltip.min.js"></script>

    <!-- MQTT Client JavaScript -->
    <script src="mqtt/js/mqttws31.js"></script>

    <!-- Custom Theme JavaScript -->
    <script src="sbadmin2/dist/js/sb-admin-2.js"></script>

    <!-- Application Script -->
    <script src="main.js"></script>

@endsection