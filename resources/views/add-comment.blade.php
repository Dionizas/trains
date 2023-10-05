

@if ($error)

    <div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>{{ __('Error') }}:</strong> {{ $error }}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="{{ __('Close') }}"></button>
    </div>

@else

    <script type="text/javascript" nonce="PROweb019689">

        $(document).ready(function() {
            setTimeout(function () {$("#allGoodKomentaras").alert("close");}, 5000);
            grecaptcha.reset();
            $("#listKomentaras .listKomentaras").load("{{ url('comment/'.$day->slug) }}", function () {});
        });
        
    </script>

@endif
