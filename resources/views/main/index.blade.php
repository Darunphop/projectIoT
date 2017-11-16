@extends('layouts.app')


@section('content') 
  
    <div id="wrapper">

        <div id="page-wrapper">
        	<div class="row">
                <div class="col-lg-12">
                    <h1 class="page-header">Client Node Status</h1>
                </div>
            </div>
            <!-- /.row -->
            @component('components.brokerStatus')
            @endcomponent
            <!-- /.row -->

            <!-- /.row -->
            @component('layouts.queue')
            @endcomponent

        </div>
        <!-- /#page-wrapper -->

    </div>
    <!-- /#wrapper -->

    @component('components.script')
    @endcomponent
 

@endsection