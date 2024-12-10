<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=0.65, maximum-scale=0.65, user-scalable=no">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>LTG Kalendorius</title>

    <link href="{{ asset('assets/favicon.ico') }}" rel="icon" type="image/x-icon" />
    <link href="{{ asset('assets/bootstrap/css/bootstrap.min.css') }}" rel="stylesheet">
    <link href="{{ asset('assets/bootstrap-icons/bootstrap-icons.css') }}" rel="stylesheet">
    <link href="{{ asset('assets/proweb/proweb.css?v=1.3.27') }}" rel="stylesheet">
</head>
<body class="bg-secondary">




    <div class="container-fluid d-flex min-vh-100 flex-column bg-secondary atvirukas position-relative p-0">
        <div class="row flex-fill fill d-flex min-vh-100 position-absolute top-0 start-0 m-0 p-0 bg-dangus"></div>

        <div class="row flex-fill fill d-flex min-vh-100 position-absolute bottom-0 start-0 m-0 p-0 bg-miskas overflow-hidden">

        <main>
            <div class="row position-absolute go-stop" id="traukinys">


@foreach ($days as $day)
    @if (!empty($day->name_lt) && !empty($day->text_lt))
        <a href="{{ url(app()->getLocale().'/'.$day->slug) }}" title="Klausimas nr. {{ $day->id }}" class="langas diena-{{ $day->id }}">{{ $day->id }}</a>
    @else
        <span class="langas diena-{{ $day->id }} nelaikas">{{ $day->id }}</span>
    @endif

@endforeach





            </div>
        </main>
        </div>


        <div class="row flex-fill fill d-flex min-vh-100 position-absolute top-0 start-0 m-0 p-0 bg-sniegas"></div>

        <div class="row flex-fill fill d-flex min-vh-100 position-absolute top-0 start-0 m-0 p-0 bg-egles-kaireje"></div>

        <div class="row flex-fill fill d-flex min-vh-100 position-absolute top-0 start-0 m-0 p-0 bg-egles-desineje"></div>

        <div class="row flex-fill fill d-flex min-vh-100 position-absolute top-0 start-0 m-0 p-0 bg-medis"></div>

        <div class="row flex-fill fill d-flex min-vh-100 position-absolute top-0 start-0 m-0 p-0 bg-krumas"></div>

        <div class="row d-inline-block position-relative top-0 rounded-bottom" id="valdymas">

            <div class="btn-group btn-group-lg" role="group" aria-label="Traukinio valdymas">
                <button type="button" class="btn btn-secondary" id="startYourEngines">
                    <i class="bi bi-circle-fill bi-pirmyn-on"></i>
                    <i class="bi bi-circle-fill bi-pirmyn-off"></i>
                    {{__('GO') }}
                </button>
                <button type="button" class="btn btn-secondary" id="stopYourEngines">
                    <i class="bi bi-circle-fill bi-stop-on"></i>
                    <i class="bi bi-circle-fill bi-stop-off"></i>
                    {{__('Stop')}}
                </button>
                <button type="button" class="btn btn-secondary" id="toggleYourEngines">
                    <i class="bi bi-volume-mute-fill"></i>
                    <i class="bi bi-volume-up-fill"></i>
                </button>

            </div>

            <audio src="{{ asset('assets/train.mp3') }}" id="traukinysGarsas" loop></audio>

        </div>

        <div class="row flex-fill fill d-flex min-vh-100 position-absolute top-0 start-0 m-0 p-0" id="theStartPage">
            <div class="d-grid col-sm-8 col-md-3 mx-auto">
                <button type="button" class="btn btn-success btn-lg" id="pradedamKelione">PIRMYN</button>
            </div>
        </div>

    </div>


  

  <div class="modal fade" id="proweb-modal" tabindex="-1" aria-labelledby="proweb-modal-title" aria-hidden="true">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5 mt-2 ps-2 koment-h-color w-100 text-center pt-4" id="proweb-modal-title"></h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Uždaryti"></button>
        </div>
        <div class="modal-custom-snow"></div>
        <div class="modal-body fs-5 px-4">...</div>
      </div>
    </div>
  </div>

    <script src="{{ asset('assets/jquery/jquery-3.6.1.min.js') }}"></script>
    <script src="{{ asset('assets/jquery-ui/jquery-ui.min.js') }}"></script>
    <script src="{{ asset('assets/bootstrap/js/bootstrap.bundle.min.js') }}"></script>
    <script src="{{ asset('assets/snow/js/snow-effect.js?v=1.0.1') }}"></script>
    <script src="{{ asset('assets/proweb/jquery-punch.js?v=1.0.8') }}"></script>
    <script src="{{ asset('assets/proweb/proweb.js?v=1.3.23') }}"></script>

</body>
</html>