
<div class="row row-50 justify-content-md-center justify-content-xl-end justify-content-xxl-end">
    
    <div class="col-md-12 col-lg-12 col-xl-12 col-xxl-12">

    @if ($day->image)
        <img src="{{ url('media/images/'.$day->image) }}" class="iliustracija-auto rounded float-start">
    @endif

    @if (app()->getLocale() == "en")
        {!! $day->text_en !!}
    @else
        {!! $day->text_lt !!}
    @endif
    
    </div>
    
</div>


<div class="row mt-5" id="addKomentaras" data-url="{{url('comment/')}}">
    <div class="col-12">

        <h5 class="text-left mb-3 koment-h-color">{{__('Your comment')}}</h5>
        @csrf
        <div class="formReply mt-3 mb-3 "></div>

        <div class="input-group mb-3">
            <span class="input-group-text"><i class="bi bi-person-fill koment-ico-color"></i></span>
            <input name="vardas" type="text" class="form-control clean-after" placeholder="{{__('Your name')}}" aria-label="{{__('Your name')}}">
        </div>

        <div class="input-group mb-3">
            <span class="input-group-text"><i class="bi bi-chat-left-dots-fill koment-ico-color"></i></span>
            <textarea name="komentaras" class="form-control clean-after" placeholder="{{__('Your comment')}}" aria-label="{{__('Your comment')}}"></textarea>
        </div>

        <input type="hidden" name="day" value="{{ $day->id }}">
        <input type="hidden" name="lang" value="{{ app()->getLocale() }}">

        <div id="issukis"></div>

        <button type="submit" id="doAddKomentaras" class="btn btn-success float-end mt-3">{{__('Add comment')}}</button>

    </div>
</div>

<script src="https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit&hl={{app()->getLocale()}}" nonce="recaptcha001" crossorigin="anonymous" async defer></script>

<div class="row mt-5" id="listKomentaras">
    <div class="col-12">

        <h5 class="text-left mb-3 koment-h-color">{{__('Visitors comments')}}</h5>

        <div class="listKomentaras">
...
        </div>

    </div>
</div>


<script type="text/javascript" nonce="PROweb019689">

    $(document).ready(function() {
        $("#listKomentaras .listKomentaras").load("{{ url('comment/'.$day->slug) }}", function () {});
    });
    
</script>

