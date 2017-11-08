@extends('layouts.app')


@section('content') 
  
<div id="wrapper">

        <div id="page-wrapper">
        	<div class="row">
                <div class="col-lg-12">
                    <h1 class="page-header">Dashboard</h1>
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
            <div class="row">
                <div class="col-lg-4 col-md-4 col-sm-4">
                    <div class="panel panel-danger" id="esp1-panel">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-xs-3">
                                    <i class="fa fa-close fa-5x" id="esp1-icon"></i> <!-- fa-close -->
                                </div>
                                <div class="col-xs-9 text-right">
                                    <div class="huge" id="esp1-status">Unknow</div>
                                    <div>NODE1 Status</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-4 col-sm-4">
                    <div class="panel panel-danger" id="esp2-panel">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-xs-3">
                                    <i class="fa fa-close fa-5x" id="esp2-icon"></i> <!-- fa-close -->
                                </div>
                                <div class="col-xs-9 text-right">
                                    <div class="huge" id="esp2-status">Unknow</div>
                                    <div>NODE2 Status</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-4 col-sm-4">
                    <div class="panel panel-danger" id="esp3-panel">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-xs-3">
                                    <i class="fa fa-close fa-5x" id="esp3-icon"></i> <!-- fa-close -->
                                </div>
                                <div class="col-xs-9 text-right">
                                    <div class="huge" id="esp3-status">Unknow</div>
                                    <div>NODE3 Status</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-6 col-md-6 col-sm-6">
                    <div class="panel panel-warning" id="esp1-led-panel">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-xs-3">
                                    <i class="fa fa-toggle-on fa-5x" id="esp1-led-icon"></i>
                                </div>
                                <div class="col-xs-9 text-right">
                                    <div class="huge" id="esp1-led-status">Unknow</div>
                                    <div>ESP1 Light Control</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-6">
                    <div class="panel panel-warning" id="esp2-led-panel">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-xs-3">
                                    <i class="fa fa-toggle-on fa-5x" id="esp2-led-icon"></i>
                                </div>
                                <div class="col-xs-9 text-right">
                                    <div class="huge" id="esp2-led-status">Unknow</div>
                                    <div>ESP2 Light Control</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- /.row -->
            <div class="row">
                <!-- /.col-lg-6 -->
                <div class="col-lg-12">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            Live Data
                        </div>
                        <!-- /.panel-heading -->
                        <div class="panel-body">
                            <div class="flot-chart">
                                <div class="flot-chart-content" id="live-chart"></div>
                            </div>
                        </div>
                        <!-- /.panel-body -->
                    </div>
                    <!-- /.panel -->
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