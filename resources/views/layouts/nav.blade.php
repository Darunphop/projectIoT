<!-- Navigation -->
<nav class="navbar navbar-default navbar-static-top" role="navigation" style="margin-bottom: 0">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>

                <!-- <a><image src="https://lilcmu.github.io/cpe_energy/image/cpecmu-logo.png" width="32"></image></a> -->
                <a class="navbar-brand" href="/">IoT Resturant</a>
            </div>
            <!-- /.navbar-header -->
            
            <!-- /.navbar-top-links -->

            <div class="navbar-default sidebar" role="navigation">
                <div class="sidebar-nav navbar-collapse">
                    <ul class="nav" id="side-menu">
                        <li>
                            <a href="/"><i class="fa fa-dashboard fa-fw"></i> Dashboard</a>
                        </li>
                        <ul class="list-group">
                            <li class="list-group-item justify-content-between">
                                All customers
                                <span class="badge badge-default badge-pill">
                                    <div id="all-customer">0</div>    
                                </span>
                            </li>
                            <li class="list-group-item justify-content-between">
                                In waiting queue
                                <span class="badge badge-default badge-pill">
                                    <div id="waiting-Q">0</div>
                                </span>
                            </li>
                            <li class="list-group-item justify-content-between">
                                Customers in services
                                <span class="badge badge-default badge-pill">
                                    <div id="want-to-order">0</div>
                                </span>
                            </li>
                            <li class="list-group-item justify-content-between">
                                Waiting for order
                                <span class="badge badge-default badge-pill">
                                    <div id="waiting-O">0</div>
                                </span>
                            </li>
                        </ul>
                        <ul class="list-group">
                            <li class="list-group-item justify-content-between">
                                Today customers
                                <span class="badge badge-default badge-pill">
                                    <div id="today-customer">0</div>
                                </span>
                            </li>
                        </ul>
                        <ul class="list-group">
                            <li class="list-group-item justify-content-between">
                                Max servicable customers
                                <span class="badge badge-default badge-pill">
                                    <div id="max-customer">0</div>
                                </span>
                            </li>
                        </ul>

                        <ul class="list-group">
                            <li class="list-group-item justify-content-between">
                                <b>Node status</b>
                                <span class="badge badge-default badge-pill"></span>
                            </li>
                            @component('layouts.status')
                            @endcomponent
                        </ul>

                        <li>
                            <a href="https://github.com/chawasit/MQTT-Web-Client-Demo"><i class="fa fa-github fa-fw"></i> Folk Me on Github</a>
                        </li>
                        <li>
                            <a href="#"><i class="fa fa-copyright fa-fw"></i> Credits<span class="fa arrow"></span></a>
                            <ul class="nav nav-second-level">
                                <li>
                                    <a href="http://www.mqtt.org">MQTT</a>
                                </li>
                                <li>
                                    <a href="https://blackrockdigital.github.io/startbootstrap-sb-admin-2">SB Admin2</a>
                                </li>
                                <li>
                                    <a href="http://www.hivemq.com">Hive MQTT</a>
                                </li>
                                <li>
                                    <a href="http://getbootstrap.com/">Bootstrap</a>
                                </li>
                                <li>
                                    <a href="https://jquery.com/">JQuery</a>
                                </li>
                                <li>
                                    <a href="https://zalzer.com/">Zalzer</a>
                                </li>
                            </ul>
                            <!-- /.nav-second-level -->
                        </li>
                   </ul>
                </div>
                <!-- /.sidebar-collapse -->
            </div>
            <!-- /.navbar-static-side -->
        </nav>